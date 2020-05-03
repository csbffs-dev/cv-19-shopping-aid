import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { DataService } from 'src/app/services/data.service';

const { Storage } = Plugins;

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  public user = new User();
  userExists = false;

  constructor(
    private router: Router,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    Storage.get({key: 'user'}).then(res => {
      if (res.value) {
        const userData = JSON.parse(res.value);
        this.user = new User(userData.firstName, userData.lastName, userData.zipCode, userData.userId);
        this.userExists = true;
      }
    });
  }

  public submitSignUp() {
    if (!this.userExists) {
      this.dataService.signUpNewUser(this.user).subscribe(res => {
        this.user.userId = res.user_id;
        this.setUserToLocalStorage(this.user);
        console.log('created a new user profile');
        this.router.navigate(['/home']);
      }, err => {
        console.error(err);
      });
    } else {
      this.dataService.updateUserInfo(this.user).subscribe(_ => {
        this.setUserToLocalStorage(this.user);
        console.log('updated user profile');
        this.router.navigate(['/home']);
      }, err => {
        console.error(err);
      });
    }
  }

  private setUserToLocalStorage(userData: User): void {
    Storage.set({
      key: 'user',
      value: JSON.stringify({
        firstName: userData.firstName,
        lastName: userData.lastName,
        zipCode: userData.zipCode,
        userId: userData.userId
      })
    });
  }
}
