import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewStorePage } from './new-store.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: NewStorePage
      }
    ])
  ],
  declarations: [NewStorePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NewStorePageModule {}
