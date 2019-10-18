import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { PageNavigationService } from '../../core/services/pageNavigationService';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginService } from '../../core/services/loginService';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  contactForm: FormGroup;

  constructor(private http: HttpClient, fb: FormBuilder, private navigationService: PageNavigationService, private loginService: LoginService) {
    this.contactForm = fb.group({
      email: ['', Validators.required],
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

  getErrorMessage() {//get error message on an invalid email or passward
    return this.contactForm.get('email').hasError('required') ? 'You must enter a value' :
      this.contactForm.get('email').hasError('email') ? 'Not a valid email' :'';
  }

  onSubmit() {
    this.http.post('http://localhost:3001/api/auth/login', { email: this.email.value, password: this.password.value })
      .pipe(
        map(data => {
          localStorage.setItem('token', data['token'].toString());
          this.loginService.email = data['user'].email;
          return data.toString();
        }))
      .toPromise()
      .then(() => {
        this.contactForm.reset();
        this.navigationService.navigate('home');
      }).catch((err) => console.log(err))
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
