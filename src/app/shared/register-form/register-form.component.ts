import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { PageNavigationService } from '../../core/services/pageNavigationService';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../core/services/loginService';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  contactForm: FormGroup;

  constructor(fb: FormBuilder, private navigationService: PageNavigationService, private http: HttpClient, private loginService: LoginService) {
    this.contactForm = fb.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  get email(): AbstractControl { //get email
    return this.contactForm.get('email');
  }

  get password(): AbstractControl {//get passward
    return this.contactForm.get('password');
  }

  get username(): AbstractControl {
    return this.contactForm.get('username');
  }

  getErrorMessage() {//get error message on an invalid email or passward
    return this.contactForm.get('email').hasError('required') ? 'You must enter a value' :
      this.contactForm.get('email').hasError('email') ? 'Not a valid email' :
        '';
  }

  onSubmit() {
    this.http.post('http://localhost:3001/api/auth/register', { email: this.email.value, password: this.password.value, userName: this.username.value })
      .toPromise()
      .then((data) => {
        console.log(data);
        this.http.post('http://localhost:3001/api/auth/login', { email: this.email.value, password: this.password.value })
          .toPromise()
          .then((data) => {
            console.log(data)
            localStorage.setItem('token', data['token'].toString());
            this.loginService.email = data['user'].email;
            this.contactForm.reset();
            this.navigationService.navigate('home');
          })
      })
      .catch(err => console.log(err))
  }

  login(data: any) {
    this.http.post('http://localhost:3001/api/auth/login', { email: this.email.value, password: this.password.value })
      .toPromise()
      .then((data) => {
        console.log(data)
        localStorage.setItem('token', data['token'].toString());
        this.loginService.email = data['user'].email;
        this.contactForm.reset();
        this.navigationService.navigate('home');
      })
  }

  validatePassward(passward: string): boolean {
    const checkExpression = new RegExp('?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$');
    if (passward.match(checkExpression)) {
      return true;
    }
    else return false;
  }

  manageImage() {
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.contactForm.dirty) {
      const dirty = confirm('Are you sure?');
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
