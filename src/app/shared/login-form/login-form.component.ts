import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { PageNavigationService, LoginService, UserService } from '../../core/services/index';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  contactForm: FormGroup;
  _credentialsError: boolean;
  _spin: boolean;

  constructor(fb: FormBuilder, private userService: UserService, private navigationService: PageNavigationService, private loginService: LoginService, public translate: TranslateService) {
    this.contactForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.credentialsError = false;
    this.spin = false;
  }

  //////////////////////settes and getters///////////////////
  get spin(): boolean {
    return this._spin;
  }

  set spin(value: boolean) {
    this._spin = value;
  }

  get credentialsError(): boolean {
    return this._credentialsError;
  }

  set credentialsError(value: boolean) {
    this._credentialsError = value;
  }

  get emailField(): AbstractControl { //get email
    return this.contactForm.get('email');
  }

  get passwordField(): AbstractControl {//get passward
    return this.contactForm.get('password');
  }

  /////////////////////////managment//////////////////////
  onSubmit() {
    this.spin = true;
    this.loginService.login(this.emailField.value, this.passwordField.value)
      .then(() => {
        this.contactForm.reset();
        this.navigationService.navigate('home');
      }).catch((err) => {
        console.log(err);
        if (!err.error.u) {
          this.credentialsError = true;
          this.spin = false;
        }
      })
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    let message: string;
    this.translate.get('guard', { value: 'confirmMsg' }).subscribe((res: string) => {
      message = res['confirmMsg'];
    });
    if (this.contactForm.dirty) {
      const dirty = confirm(message);
      if (dirty === true) {
        this.contactForm.reset();
        return true;
      }
      else { return false; }
    }
    this.contactForm.reset();
    return true;
  }
}

























// onSubmit() {
//   this.http.post('http://localhost:3001/api/auth/login', { email: this.email.value, password: this.password.value })
//     .pipe(
//       map(data => {
//         localStorage.setItem('token', data['token'].toString());
//         this.loginService.email = data['user'].email;
//         return data.toString();
//       }))
//     .toPromise()
//     .then(() => {
//       this.contactForm.reset();
//       this.navigationService.navigate('home');
//     }).catch((err) => console.log(err))
// }