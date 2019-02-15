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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { EditUserPasswordComponent } from './edit-user-password/edit-user-password.component';
import { MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatRippleModule, MatIconModule } from '@angular/material';
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
import { AngularFireStorageModule } from 'angularfire2/storage';
import { BookmarksAddComponent } from './bookmarks-add/bookmarks-add.component';
import { BookmarksEditComponent } from './bookmarks-edit/bookmarks-edit.component';
import { BookmarksDeleteComponent } from './bookmarks-delete/bookmarks-delete.component';
import { AuthGuard } from './service/auth.guard';

import { DocumentAddComponent } from './document-add/document-add.component';
import { DocumentEditComponent } from './document-edit/document-edit.component';
import { DocumentDeleteComponent } from './document-delete/document-delete.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

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
    BookmarksAddComponent,
    BookmarksEditComponent,
    BookmarksDeleteComponent,
    DocumentAddComponent,
    DocumentEditComponent,
    DocumentDeleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule,
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
    AngularFireAuthModule,
    AngularFireStorageModule,
    MatIconModule,
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatIconModule
  ],
  entryComponents: [BookmarksComponent, BookmarksAddComponent, BookmarksEditComponent, BookmarksDeleteComponent],
  providers: [AuthorizationDataService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }