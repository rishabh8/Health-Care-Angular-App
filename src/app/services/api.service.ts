import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users.model';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';
import { map } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
import { unsupported } from '@angular/compiler/src/render3/view/util';


@Injectable()
export class ApiService {

  private API_URL: string;
  private AUTH_API_URL = '/auth/server/';
  private USER_DETAIL = '/users/';

  constructor(private http: HttpClient) {
    this.API_URL = 'api';
  }

  public checkLogin(username: string, password: string): Observable<Credentials> {
    // should return response from server
    // handle error
    return this.http.post<Credentials>(this.API_URL + this.AUTH_API_URL, {username, password})
      .pipe(map(this.checkResponse), catchError(this.handleError));
  }

  public checkResponse(res: any) {
    return res != null && res !== undefined ? res : {};
  }

  public getUserDetails(userId: number): Observable<Users> {
    // should return user details retireved from server
    // handle error
    return this.http.get<Users>(this.API_URL + this.USER_DETAIL + userId.toString())
      .pipe(map(this.checkResponse), catchError(this.handleError));
  }

  public updateDetails(userDetails: Users): Observable<Users> {
    // should return user details if successfully updated the details

    // handle error
    if (userDetails) {
      return this.http.put<Users>(this.API_URL + this.USER_DETAIL + userDetails.userId, (userDetails))
        .pipe(map(this.checkResponse), catchError(this.handleError));
    }
  }

  public registerPatient(patientDetails: any): Observable<any> {

    // should return response from server if patientDetails added successfully

    // handle error

    return;
  }

  public getAllPatientsList(): Observable<any> {

    // should return all patients from server

    // handle error

    return;
  }

  public getParticularPatient(id): Observable<any> {

    // should return particular patient details from server

    // handle error

    return;
  }

  public getDiseasesList(): Observable<any> {

    // should return diseases from server

    // handle error

    return;
  }

  public bookAppointment(appointmentDetails: any): Observable<any> {

    // should return response from server if appointment booked successfully

    // handle error

    return;
  }

  public requestedAppointments(): Observable<any> {

    // should return all requested appointments from server

    // handle error

    return;
  }

  public getAppointments(userId): Observable<any> {

    // should return appointments of particular patient from server

    // handle error

    return;
  }

  public deleteAppointment(appointmentId): Observable<any> {

    // should delete the appointment

    // handle error

    return;
  }

  private handleError(error: HttpErrorResponse) {
    // handle error
    return throwError(error);
  }

}
