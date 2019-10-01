import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  contactForm: FormGroup;
  constructor(fb: FormBuilder) {
    this.contactForm = fb.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      passward: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  get email(): AbstractControl { //get email
    return this.contactForm.get('email');
  }

  get passward(): AbstractControl {//get passward
    return this.contactForm.get('passward');
  }

  get username(): AbstractControl {
    return this.contactForm.get('username');
  }

  getErrorMessage() {//get error message on an invalid email or passward
    return this.contactForm.get('email').hasError('required') ? 'You must enter a value' :
      this.contactForm.get('email').hasError('email') ? 'Not a valid email' :
        '';
  }

  register() {
//1.check for uniqe user name
//2.passward length=8 +one capital letter and one number
//3. on successes redirect to home page
//add photo
  }

  validatePassward(passward:string){
  }

  manageImage(){
  }
}
