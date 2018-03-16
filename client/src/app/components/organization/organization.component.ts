import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  organizations: any;

  constructor(
  	    private authService: AuthService
  	//private profile: ProfileComponent
  	) { }

  ngOnInit() {
  	this.authService.getOrganization().subscribe(organizationsProfile => {
     this.organizations = organizationsProfile.organizations || [];
  });

}

