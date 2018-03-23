import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],

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


  getOrgname() {

    var data = $("#attendees tr.data").map(function (index, elem) {
        
        var ret = [];
        $('.one', this).each(function () {
            var d = $(this).val()||$(this).text();
            ret.push(d);
            console.log(d);
            if (d == "N/A") {
                console.log(true);
            }
        });
        console.log(ret)
        return ret;

  });
    //var name = $("#attendees td.setup").closest('tr').find('.one').text() || $("#attendees td.setup").closest('tr').find('.one').val();
    /*var id = $(this).closest('td').attr('id');
    var txt = $(this).closest('tr').find('#id').text() || $(this).closest('tr').find('#id').val();*/
    console.log(data);
    console.log(data[0]);

};

  

}
