import { Component } from '@angular/core';
import { Users } from 'src/app/auth/models/Admin-users.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Offer } from 'src/app/consultor/models/offer/offer.model';
import { JobOfferService } from 'src/app/consultor/services/offer/job-offer.service';
import { OfferApplicationService } from 'src/app/consultor/services/offer/offer-application.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  users: Users[] = [];
  SumEntreprises: number = 0;
  SumConsultants: number = 0;
  SumOffreApplications: number = 0;
  data: any;
  options: any;
  offers: Offer[] = [];
  sumOfOffers: number = 0;
  offersData!: any;
  offersOptions!: any;


  constructor(private usersService: AuthService,
              private jobservice: JobOfferService,
              private applicationservices: OfferApplicationService
  ) { }

  ngOnInit(): void {
    this.loadUserData();
    this.LoadOffersData();
    this.loadConsultantData();
    this.loadentreprisesData();
    this.loadOffreApplicationsData();
  }
  loadConsultantData() { 
    this.usersService.getAllConsultants().subscribe((data: Users[]) => {
      this.SumEntreprises = data.length;
    });
  }
  loadentreprisesData() {
    this.usersService.getAllentreprises().subscribe((data: Users[]) => {
      this.SumConsultants = data.length;
    });
  }
  loadOffreApplicationsData() {
    this.applicationservices.getAppliedOffers().subscribe((data) => {
      this.SumOffreApplications = data.length;
     // console.log(" summ isss", data)
    });
  }

  loadUserData() {
    this.usersService.getAllUsers().subscribe((data: Users[]) => {
      console.log('Loaded all users list', data);
      this.users = data;
      this.prepareChartData();
    });
  }

  prepareChartData() {
    // Group users by day
    const groupedByDay: { [key: string]: number } = this.users.reduce((acc: { [key: string]: number }, user) => {
      const dateKey = new Date(user.createdAt).toISOString().split('T')[0];
      acc[dateKey] = (acc[dateKey] || 0) + 1;
      return acc;
    }, {});

    // Prepare chart data and labels
    const labels = Object.keys(groupedByDay).sort();
    const chartData = labels.map((label) => groupedByDay[label]);

    // Set data and options for the chart
    this.data = {
      labels: labels,
      datasets: [
        {
          label: 'Number of Users',
          data: chartData,
          fill: false,
          borderColor: '#4bc0c0',
        },
      ],
    };

    this.options = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Users',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Date',
          },
        },
      },
    };
  }

  LoadOffersData() {
    this.jobservice.getAllOffers().subscribe((data) => {
      this.offersData = data;
      console.log("statiscits data ", data);
      this.prepareOffersChartData();
      this.sumOfOffers = data.length
    })
  }

  prepareOffersChartData() {
    const groupedByDay: { [key: string]: number } = this.offersData.reduce((acc: { [key: string]: number }, offer: Offer) => {
      const dateKey = new Date(offer.date).toISOString().split('T')[0];
      acc[dateKey] = (acc[dateKey] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(groupedByDay).sort();
    const chartData = labels.map((label) => groupedByDay[label]);

    this.offersData = {
      labels: labels,
      datasets: [
        {
          label: 'Number of Offers',
          data: chartData,
          fill: false,
          borderColor: '#ff9f40',
        },
      ],
    };

    this.offersOptions = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Offers',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Date',
          },
        },
      },
    };
  }


}
