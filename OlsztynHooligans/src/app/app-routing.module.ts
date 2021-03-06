import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DocumentComponent } from './document/document.component';
import { EditUserPasswordComponent } from './edit-user-password/edit-user-password.component';
import { ChatComponent } from './chat/chat.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { AuthGuard } from './service/auth.guard';
import { DocumentAddComponent } from './document-add/document-add.component';
import { DocumentEditComponent } from './document-edit/document-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'edit', component: EditUserComponent, canActivate: [AuthGuard]},
  { path: 'editpassword', component: EditUserPasswordComponent, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'document/:id', component: DocumentComponent, canActivate: [AuthGuard]},
  { path: 'document', component: DocumentComponent, canActivate: [AuthGuard]},
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard]},
  { path: 'bookmarks', component: BookmarksComponent, canActivate: [AuthGuard]},
  { path: 'bookmarks/:id' , component: BookmarksComponent, canActivate: [AuthGuard]},
  { path: 'document-add', component: DocumentAddComponent, canActivate: [AuthGuard]},
  { path: 'document-edit/:id', component: DocumentEditComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
