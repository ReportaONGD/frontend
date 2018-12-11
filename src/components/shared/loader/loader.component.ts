import {Component, Input} from '@angular/core';
import {ANIMATION_TYPES} from 'ngx-loading';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-loader-component',
  templateUrl: './loader.component.html'
})

export class LoaderComponent {
  config: any;
  @Input() HTTPActivity: BehaviorSubject<boolean>;
  // get value() { return this.HTTPActivity.getValue(); }
  constructor() {
    this.config = {
      animationType: ANIMATION_TYPES.circleSwish,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: 'red',
      secondaryColour: 'blue',
      tertiaryColour: 'green'
    };
  }
}
