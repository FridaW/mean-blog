import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Http, RequestOptions, Headers } from '@angular/http';
import "rxjs/Rx";
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class EmailService {

	options;
	domain = this.authService.domain;
	templates: any[];
    currentPos: number = 1;
    public pos: any = new BehaviorSubject(this.currentPos);

  constructor(

  	private authService: AuthService,
  	public http: Http

  	) {  }

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authService.authToken // Attach token
      })
    });
  }

  sendEmail(invitation) {
    //let body = this.templates;
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + 'email/sendEmail', invitation, this.options).map(res => res.json());
  }

}
