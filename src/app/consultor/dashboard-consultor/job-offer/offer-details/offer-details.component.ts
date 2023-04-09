import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItemGroup } from 'primeng/api';
import { MultiSelectFilterOptions } from 'primeng/multiselect';
import { CategorieDto } from 'src/app/admin/interface/categorie.dto';
import { CategoryService } from 'src/app/admin/services/category.service';
import { Offer } from 'src/app/consultor/models/offer/offer.model';
import { OfferFormDataService } from 'src/app/consultor/services/offer/shared/offer-form-data.service';


@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})


export class OfferDetailsComponent implements OnInit {
  offerDetailsData: Partial<Offer> = this.offerFormDataService.getStepData('offerDetails');
  selectedJobs: string[] = [];


  categories: CategorieDto[] = [];
  groupedCategories: SelectItemGroup[] = [];
  groupedJobs: any[] = [];
  constructor(
    private offerFormDataService: OfferFormDataService,
    private router: Router, private categoryService: CategoryService
  ) {

  }

  ngOnInit(): void {
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
    this.offerFormDataService.updateStepData('offerDetails', this.offerDetailsData);    this.router.navigate(['/dashboardConsultor/Job-offer/offer-place']);
  }
  onBack(): void {
    this.router.navigate(['/dashboardConsultor/Job-offer/offer-info']);
  }
}
