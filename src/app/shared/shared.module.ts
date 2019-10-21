import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { RegisterFormComponent } from './register-form/register-form.component';
import { TweetComponent } from './tweet/tweet.component';
import { TweetsListComponent } from './tweets-list/tweets-list.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CreateTweetComponent } from './create-tweet/create-tweet.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReplyComponent } from './reply/reply.component';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [LoginFormComponent, RegisterFormComponent, TweetComponent, TweetsListComponent, CreateTweetComponent, UserProfileComponent,ReplyComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatButtonModule,
    MatRippleModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatInputModule,
    HttpClientModule,
    MatIconModule,
  ],
  exports: [LoginFormComponent, RegisterFormComponent, TweetComponent, TweetsListComponent, CreateTweetComponent, UserProfileComponent,ReplyComponent],
  entryComponents: [ReplyComponent]//this is for the dialog reply
})
export class SharedModule { }
