import { Component, OnInit } from '@angular/core';
import { IonInput, IonItem, IonLabel, IonList, IonSegment, IonSegmentButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-controll-bar',
  templateUrl: './controll-bar.component.html',
  styleUrls: ['./controll-bar.component.scss'],
  imports:[IonInput , IonSegment , IonSegmentButton , IonLabel , IonList , IonItem]
})
export class ControllBarComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
