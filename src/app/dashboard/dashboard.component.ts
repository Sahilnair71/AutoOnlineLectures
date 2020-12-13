import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  lectureData = new FormGroup({
    lectureDate: new FormControl('', Validators.required),
    lectureTime: new FormControl('', Validators.required),
    lectureLink: new FormControl('', Validators.required),
    subjectName: new FormControl('', Validators.required),

  })

  constructor(private auth: AngularFireAuth, private authService: AuthService) { }

  ngOnInit(): void {
  }

  add_newLecture = true

  onSubmit() {

    this.authService.addlecturedetails(this.lectureData.value)
    this.add_newLecture = false


  }
  newDetails() {
    this.add_newLecture = true
    console.log("new details")
    this.lectureData.reset()
  }

  logout() {
    this.authService.SignOut()
  }

}
