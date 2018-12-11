import {Component} from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
  <div class="row text-center">
    <div class="col-md-12 col-xs-12">
      <img class="img-fluid" src="../assets/img/404-error-page-not-found.png"/>
    </div>
    <div class="col-md-12 col-xs-12 text-center">
      <a routerLink="/">Ir a Inicio</a>
    </div>
  </div>
`
})
export class NotFoundComponent {

}
