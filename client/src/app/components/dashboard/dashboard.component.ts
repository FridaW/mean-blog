import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
//import { ProfileComponent } from '../../components/profile/profile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any;
  messageClass;
  message;
  showOperation;

  constructor( 
  	private authService: AuthService,
  	private router: Router,
  	//private profile: ProfileComponent

   ) {
  	
   }
  ngOnInit() {
   this.authService.getDashboard().subscribe(usersProfile => {
     this.users = usersProfile.users || [];
     this.users.map(function(user){
       if(user.role === 'user') {
         user.operation = 'Promote';
       } 
       else if (user.role === 'manager') {
         user.operation = 'Demote';
       }
     });
   });
  }
  changeRole(user) {
    user.oldRole = user.role;
    if(user.role === 'user') {
       user.role = 'manager';
       user.operation = 'Demote';
     } 
     else if (user.role === 'manager') {
       user.role = 'user';
       user.operation = 'Promote';
     }
    this.authService.authorizationChange(user).subscribe(updatedUser => {
        if(updatedUser.success === true) {
          this.messageClass = 'alert alert-success';
          this.message = updatedUser.message;
        }
     });

     var desc = $(user).closest('tr').children('td.one').text();
    console.log (JSON.stringify(desc))
  }
}
