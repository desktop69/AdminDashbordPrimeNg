import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FileDTO } from '../../models/file.model';
import { FileService } from '../../services/file.service';
import { JobOfferService } from '../../services/offer/job-offer.service';

import { Offer } from '../../models/offer/offer.model';

@Component({
  selector: 'app-dashbord-side-bar',
  templateUrl: './dashbord-side-bar.component.html',
  styleUrls: ['./dashbord-side-bar.component.scss']
})
export class DashbordSideBarComponent implements OnInit {
 
  files: FileDTO[] = [];
  filesLength :number = 0;
  offers:Offer[] = [];
  offerslength:number=0;
  constructor(public authService:AuthService ,private router :Router,private fileService :FileService, private apiServiceOffer :JobOfferService) { }

  activeSubmenu: string | null = null;

  toggleSubmenu(submenu: string) {
    this.activeSubmenu = this.activeSubmenu === submenu ? null : submenu;
  }


ngOnInit(): void {
  this.getAllOffersByIdEntreprsie();
  this.loadfilesOfUser();
}


  onLogout() {
    this.authService.logout();
  }






getAllOffersByIdEntreprsie(){
  const userId = this.authService.getLoggedInUserId();
  if (!userId) {
    console.error('No logged-in user found');
    return;
  }
  this.apiServiceOffer.getAllOfferByUserId(userId).subscribe((data) => {
    this.offers=data; 
    this.offerslength=this.offers.length;

    },
  );
}
  loadfilesOfUser(){
    const loggedInUserId = this.authService.getLoggedInUserId();
      if (!loggedInUserId) {
        console.error('No logged-in user found');
        return;
      }
      this.fileService.getFileByUserId(loggedInUserId).subscribe(
        (data) => {
          this.files = data;
          this.filesLength = data.length;
          console.log(this.files);
        
        },
        (error) => {
          console.error('Error loading file:', error);
        }
      );
      }
}

  

    







