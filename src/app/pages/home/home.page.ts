import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public showLoadingScreen = true;
  
  constructor(private router: Router) {}

  ngOnInit() {
    timer(3000).subscribe(() => {

      this.showLoadingScreen = false;
      this.router.navigate(['/user']);
    });
  }
}
