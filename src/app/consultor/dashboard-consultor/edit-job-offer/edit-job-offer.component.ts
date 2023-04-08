import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Offer } from '../../models/offer/offer.model';
import { JobOfferService } from '../../services/offer/job-offer.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SelectItemGroup } from 'primeng/api';
import { SharedService } from '../entreprise/shared/shared';
interface City {
  name: string,
  code: string
}

interface Country {
  name: string,
  code: string
}
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
  groupedCities!: SelectItemGroup[];
  cities!: City[];

  countries!: Country[];

  selectedCity!: City;

  selectedCountries!: Country[];

  constructor(private sharedService: SharedService, private apiofferService: JobOfferService, private activatedRoute: ActivatedRoute, private router: Router) {

    this.coverLetterForm = new FormGroup({
      coverLetterText: new FormControl('',
        [
          Validators.required,
          this.maxWordsValidator(400)
        ])
    });
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];

    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
    ];

    this.groupedCities = [
      {
        label: 'Germany', value: 'de',
        items: [
          { label: 'Berlin', value: 'Berlin' },
          { label: 'Frankfurt', value: 'Frankfurt' },
          { label: 'Hamburg', value: 'Hamburg' },
          { label: 'Munich', value: 'Munich' }
        ]
      },
      {
        label: 'USA', value: 'us',
        items: [
          { label: 'Chicago', value: 'Chicago' },
          { label: 'Los Angeles', value: 'Los Angeles' },
          { label: 'New York', value: 'New York' },
          { label: 'San Francisco', value: 'San Francisco' }
        ]
      },
      {
        label: 'Japan', value: 'jp',
        items: [
          { label: 'Kyoto', value: 'Kyoto' },
          { label: 'Osaka', value: 'Osaka' },
          { label: 'Tokyo', value: 'Tokyo' },
          { label: 'Yokohama', value: 'Yokohama' }
        ]
      }
    ];

  }

  ngOnInit(): void {
    this.apiofferService.getOfferId(this.activatedRoute.snapshot.params['id']).
      subscribe(offer => {
        this.currentOffer = offer;
        console.log(this.currentOffer);
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
}
