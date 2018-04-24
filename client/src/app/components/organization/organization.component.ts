import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { EmailService } from '../../services/email.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],

})
export class OrganizationComponent implements OnInit {

  organizations: any;
  form;
  message;
  messageClass;
  processing = false;
  emailValid;
  emailMessage;
  templates: any[];
  invitations;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private emailService: EmailService
  	//private profile: ProfileComponent
  	) {
      this.createForm(); // Create Angular 2 Form when component loads
      this.templates = this.emailService.templates;
    }

  ngOnInit() {
  	this.authService.getOrganization().subscribe(organizationsProfile => {
      this.organizations = organizationsProfile.organizations || [];
    });
  }

  sendInvitation(organization, value: any) {
    this.processing = true;
    this.disableForm();

    console.log(organization.name);

    const invitation = {
      token : { type: String, required: true },
      organization : organization.name,
      codeName : organization.codeName,
      email : this.form.get('email').value, //Get value from email input field
      link: { type: String, required: true },
    }

    console.log(invitation)

    this.emailService.sendEmail(invitation).subscribe(res => {
        console.log(res);
      }
    );

    this.authService.sendInvitation(invitation).subscribe(invitationData => {
      
      console.log(invitationData)

      if (!invitationData.success) {
        this.messageClass = 'alert alert-danger'; // Set an error class
        this.message = invitationData.message; // Set an error message
        this.processing = false; // Re-enable submit button
        this.enableForm(); // Re-enable form
      } else {
        this.messageClass = 'alert alert-success'; // Set a success class
        this.message = invitationData.message; // Set a success message
        // After 2 second timeout, navigate to the login page
        /*setTimeout(() => {
          location.reload(); //Reload this page after invitation has been sent
        }, 2000);*/
      }
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
        ])]
    })
  }

  validateEmail(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { 'validateEmail': true } // Return as invalid email
    }
  }

  // Function to check if e-mail is taken
  checkEmail() {
    // Function from authentication file to check if e-mail is taken
    this.authService.checkEmail(this.form.get('email').value).subscribe(data => {
      // Check if success true or false was returned from API
      if (!data.success) {
        this.emailValid = false; // Return email as invalid
        this.emailMessage = data.message; // Return error message
      } else {
        this.emailValid = true; // Return email as valid
        this.emailMessage = data.message; // Return success message
      }
    });
  }

  disableForm() {
    this.form.controls['email'].disable();
  }

  enableForm() {
    this.form.controls['email'].enable();
  }

  /*generateLink() {
    this.authService.sendInvitation(invitation).subscribe(invitationData => {
      this.token = invitationData.invitation;
    })
  }*/

}
