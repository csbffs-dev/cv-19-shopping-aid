import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  public user: User;

  constructor(private router: Router) { }

  ngOnInit() {
    this.user = new User();
  }

  public submitSignUp() {
    Storage.set({
      key: 'user',
      value: JSON.stringify({
        'firstName': this.user.firstName,
        'lastName': this.user.lastName,
        'zipCode': this.user.zipCode
      })
    });
    console.log(Storage.get({ key: 'user'}));
    this.router.navigate(['/home']);
  }

}
