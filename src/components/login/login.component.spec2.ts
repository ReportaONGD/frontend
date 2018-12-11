// /* tslint:disable:no-unused-variable */
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
// import { RouterTestingModule } from '@angular/router/testing';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrModule } from 'ngx-toastr';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import { Common } from '../../providers/common/common';
// import { LoginProvider } from '../../providers/login/login.provider';
// import { LoginComponent } from './login.component';
// describe('Component: Login', () => {
//   const user = Observable.of({'UserName': 'juanf.galiana@Ezentis.com', 'Password': 'Kurosaki15'});
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let loginService: LoginProvider;
//   beforeEach(() => {
//     // refine the test module by declaring the test component
//     TestBed.configureTestingModule({
//       declarations: [LoginComponent],
//       imports: [FormsModule, HttpClientTestingModule, RouterTestingModule, NgbModule.forRoot(), ToastrModule.forRoot()],
//       providers: [LoginProvider, Common]
//     });

//     // create component and test fixture
//     fixture = TestBed.createComponent(LoginComponent);
//     // get test component from the fixture
//     component = fixture.componentInstance;
//     // UserService provided to the TestBed
//     loginService = TestBed.get(LoginProvider);

//   });

//   it('canLogin returns user when the user: UserName\': \'juanf.galiana@Ezentis.com\', \'Password\': \'Kurosaki15\'', () => {
//     component.isModal = false;
//     // spyOn(loginService, 'get').and.returnValue(user);
//     const u = {'UserName': 'juanf.galiana@Ezentis.com', 'Password': 'Kurosaki15'};
//     // const resp = loginService.get(u);
//     // expect(resp).toBe(user);
//   });
// });
