import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoGameComponent } from './demo-game.component';

describe('DemoGameComponent', () => {
  let component: DemoGameComponent;
  let fixture: ComponentFixture<DemoGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
