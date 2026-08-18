import { Component, OnInit ,Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {UppercasePipe} from '../../pipes/uppercase-pipe';
import { getCharacterStatusColor } from '../../utils/status-character.util';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [
    IonicModule,
    UppercasePipe

  ],
})
export class CardComponent  implements OnInit {

  @Input() title: string = '';
  @Input() image: string = '';
  @Input() subtitle: string = ''
  @Input() description: string = '';

  constructor() { }

  ngOnInit() {}

  getStatusColor(status: string): string {
    return getCharacterStatusColor(status);
  }
}
