import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AuthorizeService {

  constructor(
  	private http: Http
  	) { }

}
