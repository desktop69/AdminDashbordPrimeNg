import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Offer } from 'src/app/consultor/models/offer/offer.model';
import { OfferFormDataService } from 'src/app/consultor/services/offer/shared/offer-form-data.service';

@Component({
  selector: 'app-offer-info',
  templateUrl: './offer-info.component.html',
  styleUrls: ['./offer-info.component.scss']
})
export class OfferInfoComponent {
  offerInfoData: Partial<Offer> = this.offerFormDataService.getStepData('offerInfo');
  submitted: boolean = false;
  coverLetterForm!: FormGroup;
  liveContent: string = '';
  constructor(
    private offerFormDataService: OfferFormDataService,
    private router: Router
  ) {
    this.coverLetterForm = new FormGroup({
      coverLetterText: new FormControl('<div>Hello World!</div><div>Clevory Job <b>Editor</b> Rocks</div><div><br></div>',
        [
          Validators.required,
          this.maxWordsValidator(400)
        ])
    });
  }

  onSubmit(): void {
 
    if (this.offerInfoData.titleO && this.offerInfoData.referenceO && this.offerInfoData.descriptionE) {
    this.offerFormDataService.updateStepData('offerInfo', this.offerInfoData);
    this.router.navigate(['/dashboardConsultor/Job-offer/offer-details']);
    return;
  }

  this.submitted = true;
}





  onBack(): void {
    this.router.navigate(['/dashboardConsultor/Job-offer/offer-info']); 
  }

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
