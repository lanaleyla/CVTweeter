import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  _spin: boolean; //spin animation

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  constructor(fb: FormBuilder, private navigationService: PageNavigationService, private loginService: LoginService, public translate: TranslateService) {
    this.contactForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]],
      image: null,
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

  get imageField(): AbstractControl { //get email
    return this.contactForm.get('image');
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

  ///////////////////////mangment//////////////////////

  //submit register form 
  onSubmit() {
    this.initializeOnSubmit();
    this.loginService.register(this.emailField.value, this.passwordField.value, this.usernameField.value, this.imageField.value.value)
      .then((data) => {
        this.spin = true;
        this.loginService.login(this.emailField.value, this.passwordField.value)
          .then(() => {
            this.onFormSuccesse();
          }).catch(err => console.log(err))
      }).catch(err => {
        this.spin = false;
        if (err.error === 'Payload Too Large') {
          console.log('image is too larege choose another one');
        }
        else if (err.status === 409 && err.error === 'email exists error') {
          this.duplicateEmail = true;
        }
        else if (err.status === 409 && err.error === 'name exists error') {
          this.duplicateName = true;
        }
      })
  }

  //get the uploaded image file and convert it to 64base string
  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.contactForm.get('image').setValue({
          filename: file.name,
          filetype: file.type,
          value: (<string>(reader.result)).split(',')[1]
        })
      };
    }
  }

  //reset properties on form submission successes
  onFormSuccesse() {
    this.imageField.setValue(null);
    this.contactForm.reset();
    this.navigationService.navigate('home');
  }

  //initialize properties when submission begins
  initializeOnSubmit() {
    if (this.imageField.value === null) {//if no image was chosen send '' default
      this.imageField.setValue({ value: '' })
    }
    this.duplicateEmail = false;
    this.duplicateName = false;
    this.spin = true;
  }

  //guard that confirms navigation from the current page
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