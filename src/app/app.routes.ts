import { Routes } from '@angular/router';

import { EventsFeedComponent } from './components/events-feed/events.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { MainComponent } from './components/main/main.component';
import { authGuard, chatGuard, OwnProfileGuard } from './auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { GameStatsComponent } from './components/profile/game-stats/game-stats.component';
import { MyEventsComponent } from './components/profile/my-events/my-events.component';
import { ParticipatingEventsComponent } from './components/profile/participating-events/participating-events.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ChatComponent } from './components/chat/chat.component';
import { VerifiedEmailComponent } from './components/verified-email/verified-email.component';


export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
      },
      {
        path: 'main',
        title: 'Meetoplay | Main',
        component: EventsFeedComponent,
        canActivate: [authGuard]
      },
      {
        path: 'profile/:id',
        title: 'Meetoplay | Profile',
        component: ProfileComponent,
        canActivate: [authGuard],
        children: [
          {
            path: '',
            redirectTo: 'gameStats',
            pathMatch: 'full'
          },
          {
            path: 'gameStats',
            component: GameStatsComponent,
            canActivate: [authGuard]
          },
          {
            path: 'myEvents',
            component: MyEventsComponent,
            canActivate: [authGuard, OwnProfileGuard]
          },
          {
            path: 'participating',
            component: ParticipatingEventsComponent,
            canActivate: [authGuard, OwnProfileGuard]
          },
          {
            path: '**',
            redirectTo: 'gameStats'
          }
        ]
      },
      {
        path: 'chat-with/:usernamefulltag',
        title: 'Meetoplay | Chat',
        component: ChatComponent,
        canActivate: [authGuard, chatGuard]
      }
    ]
  },
  {
    path: 'verified-email',
    component: VerifiedEmailComponent
  },
  {
    path: 'welcome',
    title: 'Meetoplay | Welcome',
    component: LandingPageComponent
  },
  {
    path: 'login', title: 'Meetoplay | Login',
    component: LoginRegisterComponent,
    data: { mode: 'login' }
  },
  {
    path: 'register', title: 'Meetoplay | Register',
    component: LoginRegisterComponent,
    data: { mode: 'register' }
  },
  {
    path: '**',
    redirectTo: 'main'
  }

  // otras rutas aquí


];
