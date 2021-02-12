import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';
// import * as alertify from 'alertify.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn = false;
  loginForm: FormGroup;
  isLoginFailed = false;


  emptyUserName = 'You must enter a username';
  minlengthUserName = 'User name must be at least 3 characters long';
  maxlengthUserName = 'Username cannot exceed 20 characters';
  userNamePattern = 'Username should be in alphanumeric only';
  emptyPassword = 'You must enter a password';
  minlengthPassword = 'Password must be at least 8 characters long';
  maxlengthPassword = 'Password cannot exceed 20 characters';
  passwordPattern = 'Pattern does not match';
  wrongCredentials = 'Incorrect Username or Password';

  constructor(private route: Router, private dataService: DataService) {
  }

  ngOnInit() {
    // add necessary validators

    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8),
      Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9!$%@#£€*?&]*$')]))
    });
  }

  doLogin() {

    // call authenticateUser method to perform login operation
    // if success, redirect to profile page
    // else display appropriate error message
    // reset the form
    if (this.loginForm.valid) {
      const username = this.loginForm.value.userName;
      const password = this.loginForm.value.password;
      this.dataService.authenticateUser(username, password).subscribe(response => {
        alert(response);
        if (response) {
          this.route.navigate(['profile']);
        } else {
          alert('Incorrect username or password');
        }
      });
    }
  }

}
