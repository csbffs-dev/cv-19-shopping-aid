import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  public user: User;

  constructor() { }

  ngOnInit() {
    this.user = new User();
  }

  public submitSignUp() {
    console.log('save user');
    console.log('Full name: ' + this.user.fullName);
    console.log('Zipcode: ' + this.user.zipCode);
  }

}
