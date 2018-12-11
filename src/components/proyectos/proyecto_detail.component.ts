import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Params,
  Router,
  RouterEvent,
} from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ANIMATION_TYPES } from 'ngx-loading';
import { Common } from '../../providers/common/common';
import { ProyectoService } from '../../providers/proyecto/proyecto.service';

@Component({
  selector: 'app-proyecto-detalle',
  templateUrl: 'proyecto_detail.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectoDetailComponent implements OnInit {
  isNew = true;
  config: any;
  _id: string;
  loading$: BehaviorSubject<boolean>;
  constructor(private router: Router,
    private route: ActivatedRoute) {
      this.config = {
        animationType: ANIMATION_TYPES.circleSwish,
        backdropBackgroundColour: 'rgba(0,0,0,0.1)',
        backdropBorderRadius: '4px',
        primaryColour: 'red',
        secondaryColour: 'blue',
        tertiaryColour: 'green'
      };
    }

  ngOnInit(): void {
    const params: Params = this.route.params;
    if (params.value.id) {
      this._id = params.value.id;
      this.isNew = false;
    }
  }
}
