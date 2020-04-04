import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserPage } from './user.page';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxSpinnerModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserPage
      }
    ])
  ],
  declarations: [UserPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserPageModule {}
