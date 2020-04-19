import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class CheckUser implements CanLoad {
  constructor(
    private router: Router
  ) { }

  async canLoad() {
    const res = await Storage.get({ key: 'user' });
    if (res.value) {
      return true;
    }
    else {
      this.router.navigate(['/user']);
      return false;
    }
  }
}
