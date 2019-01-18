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

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'edit', component: EditUserComponent},
  { path: 'editpassword', component: EditUserPasswordComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'document/:id', component: DocumentComponent},
  { path: 'document', component: DocumentComponent},
  { path: 'chat', component: ChatComponent},
  { path: 'bookmarks', component: BookmarksComponent},
  { path: 'bookmarks/:id' , component: BookmarksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
