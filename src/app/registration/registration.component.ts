import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthService } from '../auth.service'
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  // providers: [{
  //   provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  // }]
})
export class RegistrationComponent implements OnInit {
  loading = false

  registerForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(7)]),

  });

  UserID_DisplayName_Form = new FormGroup({
    userID: new FormControl('', Validators.required),
    displayName: new FormControl('', Validators.required)

  })

  final_value = new FormGroup({

    state: new FormControl('',)

  })



  hide = true
  isChecked: any
  constructor(private fb: FormBuilder, private auth: AngularFireAuth, private authService: AuthService) { }

  ngOnInit(): void {


  }

  async createUser() {
    this.loading = true

    console.log(this.registerForm.value, 'VALUE:')
    this.loading = await this.authService.SignUp(this.registerForm.value, this.UserID_DisplayName_Form.value)

    console.log(this.loading)


  }
  checkValue(event: any) {
    // console.log(this.isChecked)
  }


}
