import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EntrepriseDTO } from 'src/app/consultor/models/entreprise/profile-entreprise.model';
import { EntrepriseProfileService } from 'src/app/consultor/services/entreprise/entreprise-profile.service';
import { SharedService } from '../shared/shared';

@Component({
  selector: 'app-profile-entreprise',
  templateUrl: './profile-entreprise.component.html',
  styleUrls: ['./profile-entreprise.component.scss']
})
export class ProfileEntrepriseComponent implements OnInit {
  entreprise!: EntrepriseDTO;
  messages!: Message[];
  shared!: string;
  constructor(private sharedService: SharedService, private entrepriseService: EntrepriseProfileService, private authService: AuthService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.sharedService.currentMessage.subscribe(message => {
      if (message) {

        setTimeout(() => {
          this.messageService.add(message);
        }, 0);
        // Clear the message after displaying it
        this.sharedService.changeMessage(null);
      }
    });

    this.messages = [
      { severity: 'info', summary: 'Info', detail: 'You havent figured out your Profile Company' },
    ];

    this.getEntreprise();

  }




  getEntreprise(): void {
    const entrepriseId = this.authService.getLoggedInUserId();
    if (!entrepriseId) {
      console.error('No logged-in user found');
      return;
    }
    this.entrepriseService.getEntrepriseById(entrepriseId).subscribe(
      (data: EntrepriseDTO) => {
        this.entreprise = data;
        console.log('Entreprise', this.entreprise);
      },
      (error) => {
        console.error('Error fetching entreprise data:', error);
      }
    );
  }
}
