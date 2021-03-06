import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable, of, throwError } from 'rxjs';
import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users.model';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';
import { ApiService } from './api.service';
import { map, mapTo } from 'rxjs/operators';

@Injectable()
export class DataService {

  isLoggedIn = false;
  isLogIn: BehaviorSubject<boolean>;
  updateStatus: BehaviorSubject<boolean>;
  constructor(private api: ApiService) {
    this.isLogIn = new BehaviorSubject<boolean>(false);
    this.updateStatus = new BehaviorSubject<boolean>(false);
  }

  authenticateUser(username: string, password: string): Observable<boolean> {

    // store 'userId' from response as key name 'userId' to the localstorage

    // return true if user authenticated

    // return false if user not authenticated
    if (username != null && username !== undefined && password != null && password !== undefined) {
      this.api.checkLogin(username, password).subscribe(response => {
        if (response.userId > 0) {
          localStorage.setItem('userId', response.userId.toString());
          this.isLoggedIn = true;
          this.isLogIn.next(this.isLoggedIn);
        }
      });
    }
    return this.isLogIn;
  }

  getAuthStatus(): Observable<boolean> {
    return this.isLogIn.asObservable();
  }
  doLogOut() {
    // remove the key 'userId' if exists
    this.isLoggedIn = false;
    this.isLogIn.next(false);
    if (this.getUserId() > 0) {
      localStorage.removeItem('userId');
    }
  }

  getUserDetails(userId: number): Observable<Users> {

    // should return user details retrieved from api service
    if (userId > -1) {
      return this.api.getUserDetails(userId).pipe(map(res => res));
    }
  }

  updateProfile(userDetails): Observable<boolean> {

    // should return the updated status according to the response from api service
    if (userDetails != null && userDetails !== undefined) {
      this.api.updateDetails(userDetails).subscribe(data => {
        return data ? this.updateStatus.next(true) : this.updateStatus.next(false);
      });
    }
    return this.updateStatus;
  }

  registerPatient(patientDetails): Observable<any> {


    // should return response retrieved from ApiService

    // handle error

    return;

  }

  getAllPatientsList(): Observable<any> {


    // should return all patients list retrieved from ApiService

    // handle error

    return;

  }

  getParticularPatient(id): Observable<any> {

    // should return particular patient details retrieved from ApiService

    // handle error

    return;
  }

  getDiseasesList(): Observable<any> {

    // should return response retrieved from ApiService

    // handle error

    return;
  }

  bookAppointment(appointmentDetails): Observable<any> {

    // should return response retrieved from ApiService

    // handle error

    return;
  }

  getAppointments(patientId): Observable<any> {

    // should return response retrieved from ApiService

    // handle error

    return;
  }

  deleteAppointment(appointmentId): Observable<any> {

    // should return response retrieved from ApiService

    // handle error

    return;
  }

  requestedAppointments(): Observable<any> {

    // should return response retrieved from ApiService

    // handle error

    return;
  }

  getUserId(): number {

    // retrieve 'userId' from localstorage
    return parseInt(localStorage.getItem('userId'), 10);
  }


}


