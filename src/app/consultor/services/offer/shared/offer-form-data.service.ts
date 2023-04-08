import { Injectable } from '@angular/core';
import { Offer } from 'src/app/consultor/models/offer/offer.model';

@Injectable({
  providedIn: 'root',
})
export class OfferFormDataService {
  private formData: { [step: string]: Partial<Offer> } = this.getFormDataFromLocalStorage();

  updateStepData(step: string, data: Partial<Offer>): void {
    this.formData[step] = { ...this.formData[step], ...data };
    localStorage.setItem('offerFormData', JSON.stringify(this.formData));
  }

  getStepData(step: string): Partial<Offer> {
    return this.formData[step] || {};
  }

  resetFormData(): void {
    this.formData = {};
    localStorage.removeItem('offerFormData');
  }

  private getFormDataFromLocalStorage(): { [step: string]: Partial<Offer> } {
    const data = localStorage.getItem('offerFormData');
    return data ? JSON.parse(data) : {};
  }
  getFormData(): Partial<Offer> {
    return Object.assign(
      {},
      this.formData['offerInfo'],
      this.formData['offerDetails'],
      this.formData['offerSettings'],
      this.formData['offerPlace']
    );
  }
  
}