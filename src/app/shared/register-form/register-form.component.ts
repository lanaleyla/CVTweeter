import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { PageNavigationService, LoginService } from '../../core/services/index';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  contactForm: FormGroup;
  _duplicateEmail: boolean;
  _duplicateName: boolean;
  _spin: boolean;

  constructor(fb: FormBuilder, private navigationService: PageNavigationService, private loginService: LoginService, public translate: TranslateService) {
    this.contactForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]],
    });
  }

  ngOnInit() {
    this.duplicateEmail = false;
    this.duplicateName = false;
    this.spin = false;
  }

  //////////////////////settes and getters///////////////////
  get emailField(): AbstractControl { //get email
    return this.contactForm.get('email');
  }

  get passwordField(): AbstractControl {//get passward
    return this.contactForm.get('password');
  }

  get usernameField(): AbstractControl {
    return this.contactForm.get('username');
  }

  get duplicateEmail(): boolean {
    return this._duplicateEmail;
  }

  set duplicateEmail(value: boolean) {
    this._duplicateEmail = value;
  }

  get duplicateName(): boolean {
    return this._duplicateName;
  }

  set duplicateName(value: boolean) {
    this._duplicateName = value;
  }

  get spin(): boolean {
    return this._spin;
  }

  set spin(value: boolean) {
    this._spin = value;
  }

  /////////////////////////mangment//////////////////////
  onSubmit() {
    this.spin = true;
    this.loginService.register(this.emailField.value, this.passwordField.value, this.usernameField.value)
      .then((data) => {
        this.spin = true;
        this.loginService.login(this.emailField.value, this.passwordField.value)
          .then(() => {
            this.contactForm.reset();
            this.navigationService.navigate('home');
          }).catch(err => console.log(err))
      }).catch(err => {
        if (err.status === 409 && err.error === 'name exists error'||err.error==='email exists error') {
          this.duplicateName = true;
          this.spin = false;
        }
      })
  }

  manageImage() {
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
//   this.http.post('http://localhost:3001/api/auth/register', { email: this.email.value, password: this.password.value, userName: this.username.value })
//     .toPromise()
//     .then((data) => {
//       console.log(data);
//       this.http.post('http://localhost:3001/api/auth/login', { email: this.email.value, password: this.password.value })
//         .toPromise()
//         .then((data) => {
//           console.log(data)
//           localStorage.setItem('token', data['token'].toString());
//           this.loginService.email = data['user'].email;
//           this.contactForm.reset();
//           this.navigationService.navigate('home');
//         })
//     })
//     .catch(err => console.log(err))
// }