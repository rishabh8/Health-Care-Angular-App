
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { DataService } from './data.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public dataService: DataService, public router: Router) { }

  canActivate(route, state: RouterStateSnapshot): boolean {
    // return true if authenticated else redirect to login page
    if (this.dataService.getAuthStatus()) { return true; }
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}

