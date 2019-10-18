import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { RegisterFormComponent } from './register-form/register-form.component';
import { TweetComponent } from './tweet/tweet.component';
import { TweetsListComponent } from './tweets-list/tweets-list.component';
import { HttpClientModule } from '@angular/common/http';

//import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [LoginFormComponent, RegisterFormComponent, TweetComponent, TweetsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    MatIconModule,
  ],
  exports: [LoginFormComponent, RegisterFormComponent, TweetComponent, TweetsListComponent]
})
export class SharedModule { }
