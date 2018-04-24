import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  messageClass;
  message;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  	var pathname = window.location.pathname; // Returns path only
	  var url= window.location.href;     // Returns full URL
    var pathArray = window.location.pathname.split( '_' );
    var secondLevelLocation = pathArray[0];
    var tokenPart = pathArray[1];
	  //console.log(pathname)
	  //console.log(url)
    console.log(pathArray)
    //console.log(secondLevelLocation)

    if (tokenPart != "") {
      const invitation = {
        link : url
      }
      console.log(invitation)

      this.router.navigate([secondLevelLocation]);


      

      

      /*this.authService.checkInvitation(invitation).subscribe(data => {
        console.log(data)
        if (!data.success) {
          this.messageClass = 'alert alert-danger'; // Set bootstrap error class
          this.message = data.message; // Set error message
        } else {
         // this.authService.storeInvitationData(data.token);
          this.router.navigate([secondLevelLocation]);
        }
      });*/
      
    }
  }
}