import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  username = '';
  email = '';
  role = '';

  constructor(
  	private authService: AuthService
  	) { }
    

  ngOnInit() {
  	this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Set username
      this.email = profile.user.email; // Set e-mail
      this.role = profile.user.role; // Set role
  });
  }

}
