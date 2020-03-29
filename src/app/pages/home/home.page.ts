import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { User } from 'src/app/models/user';
import { Plugins } from '@capacitor/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

const { Storage } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private navEnd: Observable<NavigationEnd>;
  public user = new User();   
  constructor(
    private router: Router
  ) {
    this.navEnd = router.events.pipe(
      filter(evt => evt instanceof NavigationEnd)
    ) as Observable<NavigationEnd>;
  }

  ngOnInit() {
    console.log(Storage.keys.length);
    this.navEnd.subscribe(evt => {
      console.log('Navigation Ended!');
      this.setUser()
    });
    Storage.keys().then(key => {
      if(key.keys.indexOf('user') > -1){
        this.setUser();
      } else {
        console.log('First login.  Redirecting to user page');
        this.router.navigate(['/user']);
      }
    });
  }

  setUser(): void  {
    Storage.get({key: 'user'}).then(val => {
      const userData = JSON.parse(val.value);
      this.user = new User(userData.firstName, userData.lastName, userData.zipCode);
      console.log(this.user);
    });
  }
}
