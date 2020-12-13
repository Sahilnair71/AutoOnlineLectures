import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  loading = false;
  hide = true;
  submitted = false;
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(7)]),

  });

  constructor(private fb: FormBuilder, private auth: AngularFireAuth, private authService: AuthService) { }

  ngOnInit(): void {
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    const { value, valid } = this.loginForm;
    this.submitted = true
    if (!valid) {
      return
    } else {
      this.login()
    }
  }



  login() {
    this.loading = true
    console.log(this.loginForm.value);
    this.authService.SignIn(this.loginForm.value)


  }

}
