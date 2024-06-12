import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailVerifiedService } from '../../services/email-verified.service';

@Component({
  selector: 'app-verified-email',
  standalone: true,
  imports: [],
  template: ''
})
export class VerifiedEmailComponent implements OnInit{

  constructor(
    private router: Router,
    private emailVerifiedService: EmailVerifiedService
  ) { }

  ngOnInit(): void {
    this.emailVerifiedService.verifiedEmail = true;
    this.router.navigate(['/main']);
  }
}
