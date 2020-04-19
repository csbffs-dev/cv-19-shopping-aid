import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Plugins } from '@capacitor/core';
import { DataService } from 'src/app/services/data.service';

const { Storage } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public user = new User();

  constructor(
    public router: Router,
    private dataService: DataService
  ) { }

  ionViewWillEnter() {
    Storage.get({ key: 'user' }).then(res => {
      if (res.value) {
        const userData = JSON.parse(res.value);
        this.user = new User(userData.firstName, userData.lastName, userData.zipCode, userData.userId);
        this.dataService.loadItemTokens(this.user.userId);
      } else {
        console.log('First login.  Redirecting to user page');
        this.router.navigate(['/user']);
      }
    })
  }
}
