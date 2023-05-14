import { Injectable } from '@angular/core';
import { Offer } from '../../models/offer/offer.model';
import { isNgContainer } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  prepareDataForDoughnutChart(Pending: number, Approved: number, Rejected: number, Hired: number) {
    const data = [Pending, Approved, Rejected, Hired];

    return {
      labels: ['Pending', 'Approved', 'Rejected', 'Hired'],
      datasets: [
        {
          data,
          backgroundColor: [
            "#f0ad4e",
            "#5cb85c",
            "#d9534f",
            "#5bc0de"
          ],
          hoverBackgroundColor: [
            "#f0ad4e",
            "#5cb85c",
            "#d9534f",
            "#5bc0de"
          ]
        }
      ]
    };
  }
  getDoughnutChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2 // Adjust this value as needed
    };
  }










  prepareOffersChartData(offersData: Offer[], offersApplications: any[]) {
    // Group offers by month
  //  console.log(" service calls work for prepare chart")
    const groupedOffersByMonth: { [key: string]: number } = offersData.reduce((acc: { [key: string]: number }, offer: Offer) => {
      const dateKey = new Date(offer.date).toISOString().slice(0, 7);
      acc[dateKey] = (acc[dateKey] || 0) + 1;
      return acc;
    }, {});
    // Group applications by month
    const groupedApplicationsByMonth: { [key: string]: number } = offersApplications.reduce((acc: { [key: string]: number }, application: any) => {
      const dateKey = new Date(application.appliedAt).toISOString().slice(0, 7);
      acc[dateKey] = (acc[dateKey] || 0) + 1;
      return acc;
    }, {});
    // Combine and sort all months from both offers and applications
    const allMonths = new Set([...Object.keys(groupedOffersByMonth), ...Object.keys(groupedApplicationsByMonth)]);
    const sortedMonths = Array.from(allMonths).sort();
    // Map sorted months to chart data for offers and applications
    const offersChartData = sortedMonths.map((month) => groupedOffersByMonth[month] || 0);
    const applicationsChartData = sortedMonths.map((month) => groupedApplicationsByMonth[month] || 0);

    // Convert month numbers to month names
    const monthLabels = sortedMonths.map((month) => {
      const [year, monthNumber] = month.split('-');
      return `${this.getMonthName(+monthNumber)} ${year}`;
    });
    // Set chart data and options
    const chartData = {
      labels: monthLabels,
      datasets: [
        {
          label: 'Number of Offers',
          data: offersChartData,
          fill: false,
          borderColor: '#ff9f40',
        },
        {
          label: 'Number of Applications',
          data: applicationsChartData,
          fill: false,
          borderColor: '#42A5F5',
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number',
          },
          ticks: {
            precision: 0,
          },
        },
        x: {
          title: {
            display: true,
            text: 'Month',
          },
        },
      },
    };
    return { chartData, chartOptions };

  }




  getMonthName(monthNumber: number): string {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[monthNumber - 1];
  }


}
