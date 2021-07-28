import { Component, OnInit, NO_ERRORS_SCHEMA, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Users } from '../../models/users.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  editProfile = false;
  userId = -1;
  userDetails = new Users();

  editProfileForm: FormGroup;
  userImg = './../../assets/user.jpg';
  mobileErrMsg = 'You must enter a valid mobile number';
  emailErrMsg = 'You must enter a valid Email ID';
  locationErrMsg = 'You must enter the location';

  constructor(private dataService: DataService) { }

  ngOnInit() {

    // add necessary validators
    // username should be disabled. it should not be edited

    this.editProfileForm = new FormGroup({
      userName: new FormControl({ value: '' }),
      mobile: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      location: new FormControl('', Validators.compose([Validators.required]))
    });
    // if (this.dataService.getAuthStatus()) {
    this.userId = this.dataService.getUserId();
    this.getProfileDetails();
    this.editProfile = false;
    // }
    // get login status from service
    // get userId from service and assign it to userId property
    // get profile details and display it

  }

  changeMyProfile() {

    // if successfully changed the profile it should display new details hiding the form
    this.userDetails.mobile = this.editProfileForm.value.mobile;
    this.userDetails.email = this.editProfileForm.value.email;
    this.userDetails.location = this.editProfileForm.value.location;
    this.dataService.updateProfile(this.userDetails).subscribe(data => {
      if (data) {
        this.editProfile = false;
      } else {
        this.editProfile = true;
      }
    });
  }

  editMyProfile() {

    // change editProfile property value appropriately
    this.editProfile = true;
  }

  discardEdit() {

    // change editProfile property value appropriately
    this.editProfile = false;
  }

  getProfileDetails() {

    // retrieve user details from service using userId
    if (this.userId > -1) {
      this.dataService.getUserDetails(this.userId).subscribe(data => {
        if (data) {
          this.userDetails = data;
        }
      });
    }
  }

}
