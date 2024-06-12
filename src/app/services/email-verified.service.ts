import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailVerifiedService {
  private _verifiedEmail = false;

  constructor() { }

  get verifiedEmail(): boolean {
    return this._verifiedEmail;
  }

  set verifiedEmail(value: boolean) {
    this._verifiedEmail = value;
  }
}
