import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { PageNavigationService } from '../../core/services/pageNavigationService';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  contactForm: FormGroup;

  constructor(fb: FormBuilder,private navigationService: PageNavigationService) {
    this.contactForm = fb.group({
      email: ['', Validators.required],
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

  getErrorMessage() {//get error message on an invalid email or passward
    return this.contactForm.get('email').hasError('required') ? 'You must enter a value' :
      this.contactForm.get('email').hasError('email') ? 'Not a valid email' :
        '';
  }

  login(){//perform login to the system
    //search for user, if found valid navigate home else show error message:
    //return "user email or passward are incorrect please try again"
    this.contactForm.reset();    
    this.navigationService.navigate('home');
  }

}
