import { Component, ViewChild } from '@angular/core';
import { OfferApplicationWithConsultant } from '../../models/offer/offerapplicationwithconsultant.model';
import { JobOfferService } from '../../services/offer/job-offer.service';
import { ActivatedRoute } from '@angular/router';
import { OfferApplicationService } from '../../services/offer/offer-application.service';
import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common';
import { UpdateCandidatureComponent } from '../update-candidature/update-candidature.component';
@Component({
  selector: 'app-list-candidature',
  templateUrl: './list-candidature.component.html',
  styleUrls: ['./list-candidature.component.scss']
})
export class ListCandidatureComponent {
  offre_id!: string;
  candidature!: OfferApplicationWithConsultant[];
  exportColumns!: any[];
  cols: any[] = [];
  selectedCandidature: OfferApplicationWithConsultant[] = [];
  @ViewChild(UpdateCandidatureComponent) updateCandidatureComponent!: UpdateCandidatureComponent;

  constructor(private apiofferService: JobOfferService,
    private activatedRoute: ActivatedRoute,
    private aplicationservices: OfferApplicationService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.offre_id = this.activatedRoute.snapshot.params['id']
    this.loadCandidatures();
    this.TableHeader()
  }
  openUpdateModal(app_obj :OfferApplicationWithConsultant) {
    this.updateCandidatureComponent.loadDataforUpdate(app_obj);
  }
  TableHeader() {
    this.cols = [
      { field: 'consultantObject.Name', header: 'First Name' },
      { field: 'consultantObject.FirstName', header: 'Last Name' },
      { field: 'consultantObject.Dateofbirth', header: 'Date of Birth' },
      { field: 'consultantObject.Region', header: 'Region' },
      { field: 'phoneNumber', header: 'Phone Numbers' },
      { field: 'appliedAt', header: 'Applied At' },
      { field: 'status', header: 'Status' },
      { field: 'actions', header: 'Actions' }
    ];
    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
  }

  loadCandidatures() {
    this.aplicationservices.getOfferApplicationsByOffreId(this.offre_id).subscribe((data) => {
      this.candidature = data;
      console.log("applications data is equal to ", data)
    })
  }
  exportPdf() {
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(autoTable => {
        const doc = new jsPDF.default("p", "pt");
        autoTable.default(doc, {
          columns: this.exportColumns,
          body: this.candidature.map(cand => [
            cand.consultantObject.Name,
            cand.consultantObject.FirstName,
            this.datePipe.transform(cand.consultantObject.Dateofbirth, 'yyyy-MM-dd'), // pipe and filter the time from the date
            cand.consultantObject.Region,
            cand.consultantObject.phoneNumber.join(', '),
            this.datePipe.transform(cand.appliedAt, 'yyyy-MM-dd'), // pipe and filter the time from the date
            cand.status
          ]),
          theme: 'grid',
          styles: {
            cellPadding: 5,
            fontSize: 10,
          },
          headStyles: {
            fillColor: [44, 62, 80], // Header background color
            textColor: 255, // Header text color
            fontStyle: 'bold',
          },
          columnStyles: {
            0: { cellWidth: 'auto' },
            1: { cellWidth: 'auto' },
            2: { cellWidth: 'auto' },
            3: { cellWidth: 'auto' },
            4: { cellWidth: 'auto' },
            5: { cellWidth: 'auto' },
            6: { cellWidth: 'auto' },
            7: { cellWidth: 'auto' },
          },
        });
        doc.save('candidatures.pdf');
      })
    })
  }
  prepareDataForExcel() {
    return this.candidature.map(cand => {
      return {
        FisrtName: cand.consultantObject.Name,
        LastName: cand.consultantObject.FirstName,
        DateOFBirth: this.datePipe.transform(cand.consultantObject.Dateofbirth, 'yyyy-MM-dd'), // pipe and filter the time from the date
        PhoneNumber: cand.consultantObject.phoneNumber.join(', '), // Convert the array to a string
        AppliedAt: this.datePipe.transform(cand.appliedAt, 'yyyy-MM-dd'), // pipe and filter the time from the date
        Status: cand.status,
      };
    });
  }
  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.prepareDataForExcel());
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "candidatures");
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  getChipStyle(status: string) {
    switch (status) {
      case 'Pending':
        return { styleClass: 'p-chip p-chip-warning', icon: 'pi pi-clock' };
      case 'Approved':
        return { styleClass: 'p-chip p-chip-success', icon: 'pi pi-check' };
      case 'Rejected':
        return { styleClass: 'p-chip p-chip-danger', icon: 'pi pi-times' };
      default:
        return { styleClass: 'p-chip p-chip-info', icon: 'pi pi-briefcase' };
    }
  }
  
  


}

