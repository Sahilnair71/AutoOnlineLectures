import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { from } from 'rxjs';
import { Router } from "@angular/router";

@Component({
  selector: 'app-verify-email-address',
  templateUrl: './verify-email-address.component.html',
  styleUrls: ['./verify-email-address.component.css']
})
export class VerifyEmailAddressComponent implements OnInit {
  seconds;

  constructor(public authService: AuthService, public router: Router) { }


  ngOnInit(): void {
    this.update_time()
    setTimeout(() => {
      this.router.navigate(['']);
    }, 20000);
  }

  user = this.authService.userData

  resend_email() {
    return this.authService.SendVerificationMail()
  }

  update_time() {
    let counter = 20

    const interval = setInterval(() => {
      this.seconds = counter
      console.log(counter);
      counter--;


      if (counter < 0) {
        clearInterval(interval);

      }
    }, 1000);

  }


}
