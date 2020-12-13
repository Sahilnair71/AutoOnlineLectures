import { Injectable, NgZone } from '@angular/core';
import { User } from './user'
import { from } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { LectureDetails } from './lectureDetails'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  userSnapshot: Observable<User>
  checkuser: any
  userEmail: any

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  SignIn(UserVal) {
    this.userEmail = UserVal['email']
    return this.afAuth.signInWithEmailAndPassword(UserVal['email'], UserVal['password'])
      .then((result) => {


        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        // console.log(result['user']['uid']);
        this.getData(UserVal['email'])

        // this.SetUserData(result.user, UserVal);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SignUp(UserVal, UserNam) {
    console.log(UserVal);

    this.afAuth.createUserWithEmailAndPassword(UserVal['email'], UserVal['password'])
      .then((result) => {
        console.log(result)
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user, UserVal, UserNam);
      }).catch((error) => {
        window.alert(error.message)
      })

    return false
  }

  SendVerificationMail() {
    return this.afAuth.currentUser.then(user => {
      this.checkuser = user;
      user.sendEmailVerification()
    }).catch(err => console.log(err)).then(() => {
      this.router.navigate(['verify-email-address'])




    })



  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  SetUserData(user, UserVal, UserNam) {

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.email}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: UserNam['displayName'],
      userID: UserNam['userID'],
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })


  }
  async getData(email) {
    const userVal = this.afs.collection('users').doc<User>(email)
    let userSnapshot = await userVal.valueChanges()
    userSnapshot.subscribe(res => {
      console.log(res)
    })

  }
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    })
  }

  addlecturedetails(lecture_values) {
    console.log(this.userEmail)
    const date = lecture_values['lectureDate']
    var time = lecture_values['lectureTime']
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = '' + d.getFullYear()
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    const new_date = year + month + day
    time = time.split(':')


    // if (time[0].length < 2) {
    //   time[0] = '0' + time[0]
    // }

    // if (time[1].length < 2) {
    //   time[1] = '0' + time[1]
    // }
    time = time[0] + time[1]

    const dayTime = new_date + time
    var datum = new Date(Date.UTC(Number(year), Number(month), Number(day), Number(time[0]), Number(time[1])))
    var timeStamp = datum.getTime() / 1000

    const userRef: AngularFirestoreDocument<any> = this.afs.collection('users').doc(this.userEmail).collection('lectureDates').doc(new_date).collection(new_date).doc(dayTime)
    // doc(`users/${this.userEmail}/lectureDates/${new_date}/${dayTime}`)
    const userData: LectureDetails = {
      lectureDate: new_date,
      lectureTime: dayTime,
      lectureLink: lecture_values['lectureLink'],
      subjectName: lecture_values['subjectName'],
      timeStamp: timeStamp,
      Status: 'Pending'
    }
    userRef.set(userData, {
      merge: true
    })
    console.log(userData)
  }

}
