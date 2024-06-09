import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { backAPIUrl } from '../config';
import { SocketMessage } from '../interfaces/socket-message';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  backAPIUrl: string = backAPIUrl;

  token: string = localStorage.getItem('access_token') || sessionStorage.getItem('access_token') || '';

  private Echo: Echo;
  private Pusher: typeof Pusher;

  private privateMessageSource = new Subject<SocketMessage>();
  privateMessage$ = this.privateMessageSource.asObservable();

  private privateMessagesChannel: string;

  private privateDone: boolean = false;

  constructor() {
    this.Pusher = Pusher;
  }


  setupEchoPublic() {

    this.Echo = new Echo({
      broadcaster: 'reverb',
      key: 'ixyw7gpei8mjty0vi0n5',
      wsHost: '35.173.106.192',
      wsPort: 8085,
      wssPort: 443,
      forceTLS: false,
      enabledTransports: ['ws', 'wss'],
    });

    this.Echo.channel(`public`).listen('GlobalMessage', (e: any) => {
      console.log("From public channel");
      console.log(e);
    });
  }

  setupEcho(userId: number, host: string) {
    return new Promise<void>((resolve, reject) => {
      try {
        if (!this.privateDone) {
          this.Echo = new Echo({
            broadcaster: 'reverb',
            key: 'ixyw7gpei8mjty0vi0n5',
            wsHost: host,
            wsPort: 8085,
            wssPort: 8085,
            forceTLS: false,
            enabledTransports: ['ws'],
            auth: {
              headers: {
                'Authorization': 'Bearer ' + this.token,
              },
            },
            authEndpoint: `http://${host}/api/broadcasting/auth`
          });

          this.privateMessagesChannel = `App.Models.User.${userId}`;

          this.Echo.private(this.privateMessagesChannel).listen('GotMessage', (response: any) => {
            console.log("From private channel");
            console.log(response);

            this.privateMessageSource.next(response.message);
          });

          this.privateDone = true;
          resolve();
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  setupEchoPrivate(userId: number) {
    this.setupEcho(userId, 'meetoplay.duckdns.org')
      .catch(() => this.setupEcho(userId, '35.173.106.192'));
  }

}
