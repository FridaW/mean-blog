import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class SetupService {

	options;
  domain = this.authService.domain;


  constructor(
  	private authService: AuthService,
    private http: Http
  	) { }

  createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf-8', // Format set to JSON
        'authorization': this.authService.authToken // Attach token
      })
    });
  }

  generatePassword() {
    this.createAuthenticationHeaders(); // Create headers
    const randomPasswords = getPassword ()
    function getPassword () {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            reVal = "";
          for (var i = 0, n = charset.length; i < length; ++i) {
                reVal += charset.charAt(Math.floor(Math.random() * n));
            }
            return reVal
    }

    console.log(randomPasswords)
    return this.http.post(this.domain + 'authentication/generatePassword/', randomPasswords, this.options).map(res => res.json());
     
  };


}

