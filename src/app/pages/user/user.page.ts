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
  public userExists: boolean = false;

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
          this.user = new User(userData.firstName, userData.lastName, userData.zipCode, userData.userId);
          this.userExists = true;
          this.spinner.hide();
        })
      }
    });
  }

  public submitSignUp() {
    if(!this.userExists) {
      this.dataService.signUpNewUser(this.user).subscribe(response => {
        this.user.userId = response.user_id;
        this.setUserToLocalStorage(this.user);
        this.router.navigate(['/home']);
      }, err => { console.error(err); });
    } else {
      this.dataService.updateUserInfo(this.user).subscribe(response => {
        this.setUserToLocalStorage(this.user);
        this.router.navigate(['/home']);
      }, err => { console.error(err); });
    }
  }

  private setUserToLocalStorage(userData: User): void {
    Storage.set({
      key: 'user',
      value: JSON.stringify({
        'firstName': userData.firstName,
        'lastName': userData.lastName,
        'zipCode': userData.zipCode,
        'userId': userData.userId
      })
    });
  }
}
