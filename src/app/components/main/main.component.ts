import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ChatsComponent } from '../chats/chats.component';
import { EventsFeedComponent } from '../events-feed/events.component';
import { ProfilecardComponent } from '../profilecard/profilecard.component';
import { AuthService } from '../../services/auth.service';
import { AsideComponent } from '../aside/aside.component';
import { AlertService } from '../../services/alert.service';
import { EmailVerifiedService } from '../../services/email-verified.service';
import { AlertComponent } from './alert/alert.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    ChatsComponent,
    EventsFeedComponent,
    ProfilecardComponent,
    HttpClientModule,
    AsideComponent,
    AlertComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private emailVerificationService: EmailVerifiedService
  ) { }

  ngOnInit() {
    this.authService.getUserData().subscribe();

    if (this.emailVerificationService.verifiedEmail) {
      setTimeout(() => {
        this.alertService.showAlert('info', 'Correo verificado! ✉️✅');
      }, 2000);
      console.log('Email verified');
      this.emailVerificationService.verifiedEmail = false; // reset the state
    }
  }
}
