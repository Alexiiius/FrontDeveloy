import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AlertComponent } from './components/main/alert/alert.component';
import { AlertService } from './services/alert.service';
import { EmailVerifiedService } from './services/email-verified.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    SplashScreenComponent,
    CommonModule,
    AlertComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('fade', [
      state('visible', style({
        opacity: 1,
      })),
      state('hidden', style({
        opacity: 0,
      })),
      transition('visible => hidden', animate('1000ms ease-out')),
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'MeetoPlay';

  authService = inject(AuthService);
  alertService = inject(AlertService);
  route = inject(ActivatedRoute);
  emailVerificationService = inject(EmailVerifiedService);

  splashScreenVisible = 'visible';

  constructor() { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      if (data['verifiedEmail'] === true) {
        this.emailVerificationService.verifiedEmail = true;
        console.log('Email verified');
      }
    });

    console.log('Checking token');
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    if (token) {
      this.authService.checkToken().subscribe(
        (response) => {
          if (response) {
            this.authService.isAuth.next(true);
            setTimeout(() => {
              this.splashScreenVisible = 'hidden';
            }, 100);
          }
        },
        (error) => {
          this.authService.isAuth.next(false);
          this.splashScreenVisible = 'hidden';
          console.log(error);
        });
    } else {
      this.authService.isAuth.next(false);
      this.splashScreenVisible = 'hidden';
    }
  }
}
