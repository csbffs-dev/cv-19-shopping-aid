import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewStorePage } from './new-store.page';

describe('NewStorePage', () => {
  let component: NewStorePage;
  let fixture: ComponentFixture<NewStorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStorePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewStorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
