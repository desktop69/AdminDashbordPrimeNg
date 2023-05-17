import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { JobOfferService } from '../../services/offer/job-offer.service';
import { Offer } from '../../models/offer/offer.model';
import { OfferApplicationService } from '../../services/offer/offer-application.service';
import { forkJoin } from 'rxjs';
import { ChartService } from '../../services/charts/chart.service';

@Component({
  selector: 'app-dashbord-index',
  templateUrl: './dashbord-index.component.html',
  styleUrls: ['./dashbord-index.component.scss']
})
export class DashbordIndexComponent {
  offers: Offer[] = [];
  offersApplications: any[] = [];
  offersData!: any;
  offersOptions!: any;
  dotoptions!: any;
  sumOfOffers: number = 0;
  sumOfPending: number = 0;
  sumOfApproved: number = 0;
  sumOfRejected: number = 0;
  sumOfHired: number = 0;
  data: any;
  constructor(private authService: AuthService,
    private apiServiceOffer: JobOfferService,
    private appliService: OfferApplicationService,
    private chartService: ChartService
  ) { }

  ngOnInit(): void {
    this.loadDataForLinechart();
    this.loadDataForDoughnutChart();
  }
  preparechartForDoughnutChart(Pending: number, Approved: number, Rejected: number, Hired: number) {
    this.data = this.chartService.prepareDataForDoughnutChart(Pending, Approved, Rejected, Hired);
    this.dotoptions = this.chartService.getDoughnutChartOptions();
  }

  loadDataForLinechart() {
    const userId = this.authService.getLoggedInUserId();
    if (!userId) {
      console.error('No logged-in user found');
      return;
    }
    if (this.authService.checkRole('entreprise')) {
      this.loadDataForLinechartForEntreprise(userId);
    } else {
     // console.log("hereeee")
      this.loadDataForLinechartForConsultant(userId);
    }
  }
  loadDataForLinechartForEntreprise(userId: string) {
    forkJoin({
      offers: this.apiServiceOffer.getAllOfferByUserId(userId),
      applications: this.appliService.getOfferApplicationsByEntrepriseId(userId),
    }).subscribe(({ offers, applications }) => {
      const { chartData, chartOptions } = this.chartService.prepareOffersChartData(offers, applications);

      this.offersData = chartData;
      this.offersOptions = chartOptions;
      this.sumOfOffers = offers.length;
    });
  }
  loadDataForLinechartForConsultant(userId: string) {
  //  getAppliedOffersByConsultantId
    this.appliService.getOffersApplicationsByConsultantId(userId).subscribe((applications) => {
       const { chartData, chartOptions } = this.chartService.prepareOffersChartDataConsultant(applications);
       console.log("subscirebe to getAppliedOffersByConsultantId ", applications)
      this.offersData = chartData;
      this.offersOptions = chartOptions;
      // console.log("line chart for consultant ", this.offersData)
      // console.log("line chart for consultant ", this.offersOptions)
    })
  
  }


  loadDataForDoughnutChart() {
    const userId = this.authService.getLoggedInUserId();
    if (!userId) {
      console.error('No logged-in user found');
      return;
    }
    if (this.authService.checkRole('entreprise')) {
      this.loadDataForEntreprise(userId)
    } else {
      this.loadDataForConsultant(userId)

    }

  }
  loadDataForConsultant(userId: string) {
    forkJoin({
      Pending: this.appliService.getOfferAppliByconsultIdAndPending(userId),
      Approved: this.appliService.getAppliByconsultIdAndApproved(userId),
      Rejected: this.appliService.getAppliByconsultIdAndRejected(userId),
      Hired: this.appliService.getAppliByconsultIdAndHired(userId),
    }).subscribe(({ Pending, Approved, Rejected, Hired }) => {
      this.preparechartForDoughnutChart(Pending, Approved, Rejected, Hired);
      console.log("loadDataForDoughnutChart in the forkjoin");
    })
  }

  loadDataForEntreprise(userId: string) {
    forkJoin({
      Pending: this.appliService.getOfferAppliByIdAndPending(userId),
      Approved: this.appliService.getAppliByIdAndApproved(userId),
      Rejected: this.appliService.getAppliByIdAndRejected(userId),
      Hired: this.appliService.getAppliByIdAndHired(userId),
    }).subscribe(({ Pending, Approved, Rejected, Hired }) => {
      this.preparechartForDoughnutChart(Pending, Approved, Rejected, Hired);
      console.log("loadDataForDoughnutChart in the forkjoin");
    })
  }


}