import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { DataService } from 'src/app/services/data.service';
import { NgxSpinnerService } from 'ngx-spinner';

const { Storage } = Plugins;

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  public user: User;

  constructor(
    private router: Router,
    private dataService: DataService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.user = new User();
    Storage.get({key: 'user'}).then(val => {
      if(val.value){
        this.spinner.show();
        const userData = JSON.parse(val.value);
        this.dataService.getUser(userData.userId).subscribe(res =>{
          this.user = new User(userData.firstName, userData.lastName, userData.zipCode);
          this.spinner.hide();
        })
      }
    });
  }

  public submitSignUp() {
    this.dataService.signUpNewUser(this.user).subscribe(response => {
      Storage.set({
        key: 'user',
        value: JSON.stringify({
          'firstName': this.user.firstName,
          'lastName': this.user.lastName,
          'zipCode': this.user.zipCode,
          'userId': response.user_id
        })
      });
      this.router.navigate(['/home']);
    }, err => {
      console.error(err);
    });
  }
}
