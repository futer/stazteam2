import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentComponent } from './document/document.component';
import { ChatComponent } from './chat/chat.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { HttpClientModule } from '@angular/common/http';
import { BookmarksPopupComponent } from './bookmarks/bookmarks.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { EditUserPasswordComponent } from './edit-user-password/edit-user-password.component';
import { MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatRippleModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import '../polyfills';
import {MatNativeDateModule} from '@angular/material';
import { AuthorizationDataService } from './service/authorization-data.service';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from './store/reducers/login.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './store/effects/login.effects';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EditUserComponent,
    DashboardComponent,
    DocumentComponent,
    ChatComponent,
    BookmarksComponent,
    EditUserPasswordComponent,
    BookmarksPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({ login: loginReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 10 // number of states to retain
    }),
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    EffectsModule.forRoot([LoginEffects]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
  ],
  entryComponents: [BookmarksComponent, BookmarksPopupComponent],
  providers: [AuthorizationDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
