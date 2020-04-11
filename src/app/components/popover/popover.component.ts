import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { ReportedItem } from 'src/app/models/reported-item';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  public item: ReportedItem;

  constructor(
    private navParams: NavParams,
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
    this.item = new ReportedItem();
    this.item.type = this.navParams.get<string>('type');
  }

  onKeydown(event: any) {
    if (event.key === "Enter") {
      this.popoverCtrl.dismiss(this.item);
    }
  }

}
