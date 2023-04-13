import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Offer } from '../../models/offer/offer.model';
import { JobOfferService } from '../../services/offer/job-offer.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SelectItemGroup } from 'primeng/api';
import { SharedService } from '../entreprise/shared/shared';
import { data } from 'src/app/utils/data';
import { CategorieDto } from 'src/app/admin/interface/categorie.dto';
import { CategoryService } from 'src/app/admin/services/category.service';

@Component({
  selector: 'app-edit-job-offer',
  templateUrl: './edit-job-offer.component.html',
  styleUrls: ['./edit-job-offer.component.scss']
})
export class EditJobOfferComponent {
  currentOffer = new Offer();
  submitted: boolean = false;
  coverLetterForm!: FormGroup;
  liveContent: string = '';

  selectedJobs: string[] = [];
  countries = data;

  categories: CategorieDto[] = [];
  groupedCategories: SelectItemGroup[] = [];
  groupedJobs: any[] = [];

  constructor(private sharedService: SharedService, private apiofferService: JobOfferService, private activatedRoute: ActivatedRoute, private router: Router,private categoryService :CategoryService) {

    this.coverLetterForm = new FormGroup({
      coverLetterText: new FormControl('',
        [
          Validators.required,
          this.maxWordsValidator(400)
        ])
    });
    
  }

  ngOnInit(): void {
    this.apiofferService.getOfferId(this.activatedRoute.snapshot.params['id']).
      subscribe(offer => {
        this.currentOffer = offer;
        console.log(this.currentOffer);
      });

      this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoryService.getAllCategories().subscribe((data) => {
      const categories = data.filter(category => !category.Parent);
      this.groupedJobs = categories.map(category => {
        const group = {
          label: category.title,
          items: category.childrens?.map(child => ({ label: child.title, value: child.title })) || []
        };
        return group;
      });
    });
  }

  onSubmit(): void {

    if (this.currentOffer.titleO && this.currentOffer.referenceO && this.currentOffer.descriptionE) {
      this.apiofferService.updateOffer(this.currentOffer, this.activatedRoute.snapshot.params['id']).subscribe(entrep => {
        this.currentOffer = entrep;
        this.sharedService.changeMessage({ severity: 'success', summary: 'Successful', detail: 'Offer Updated successfully ', life: 3000 });
        this.router.navigate(['/dashboardConsultor/offer-list']);
        return;
      });

      this.submitted = true;
    }
  }


  //this for the editor
  maxWordsValidator(maxWords: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const text = control.value || '';

      const words = text.trim().split(/\s+/);
      const wordCount = words.filter((word: string | any[]) => word.length > 0).length;

      if (wordCount > maxWords) {
        return { maxWords: { maxWords, actualWords: wordCount } };
      }

      return null;
    };
  }


  get maxWordsError() {
    return this.coverLetterForm.controls['coverLetterText'].errors?.['maxWords'];
  }

  get actualWords() {
    return this.maxWordsError?.actualWords;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.coverLetterForm.get(fieldName);
    const ok = !!(field && field.invalid && (field.dirty || field.touched));
    return ok
  }


  submitCoverLetter() {
    if (this.coverLetterForm.valid) {
      // Handle cover letter submission here
      console.log('Cover Letter:', this.coverLetterForm.value.coverLetterText);
    } else {
      console.log('Cover letter form is not valid');
    }
  }


//hedha mtaa lcountries meni fahem menou chy
  keys(obj: object): string[] {
    return Object.keys(obj);
  }
  onSelectCountry(): void {
    if (this.currentOffer.Address !== 'Tunisia') {
      this.currentOffer.Region = '';
      this.currentOffer.City = '';
    }
  }


  getCities(country: string, region: string): string[] {
    const countryData = (this.countries as {[key: string]: any})[country];
    return countryData?.[region]?.cities || [];
  }
}
