import { Input, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-alert-component',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {

  @Input() alert: IAlert;
  private alertList = new  Array<IAlert>();
  close = false;
  constructor() {
    this.alertList.push({
      id: 1,
      type: 'success',
      message: 'Operación realizada con exito.',
    }, {
      id: 2,
      type: 'info',
      message: 'No existe ningún elemento, pulse en el botón + para agregar un nuevo.',
    }, {
      id: 3,
      type: 'warning',
      message: 'No existe ningún objetivo especifico asociado al proyecto. Ingrese al menos uno para poder asociar resultados al mismo.',
    }, {
      id: 4,
      type: 'danger',
      message: `No se puede eliminar el registro seleccionado, existen elementos vinculados al registro.`,
    });
  }
  ngOnInit(): void {
  }
  getAlert(id: number): IAlert {
    const alert = this.alertList.filter((item) => {
      return item.id === id;
    });
    return alert[0];
  }
}
export interface IAlert {
  id: number;
  type: string;
  message: string;
}
