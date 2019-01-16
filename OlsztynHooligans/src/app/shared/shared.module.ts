import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { ButtonlistComponent } from './buttonlist/buttonlist.component';
import { ImageComponent } from './image/image.component';
import { InputComponent } from './input/input.component';
import { LabelComponent } from './label/label.component';
import { FormComponent } from './form/form.component';
import { LiComponent } from './li/li.component';
import { ChatComponent } from './chat/chat.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DocumentIndexComponent } from './document-index/document-index.component';
import { DocumentIndexBoxComponent } from './document-index-box/document-index-box.component';
import { ButtonchatComponent } from './buttonchat/buttonchat.component';
import { MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatRippleModule } from '@angular/material';
import {MatNativeDateModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatinputComponent } from './matinput/matinput.component';


@NgModule({
  declarations: [
    ButtonComponent,
    ButtonchatComponent,
    ButtonlistComponent,
    ImageComponent,
    InputComponent,
    LabelComponent,
    FormComponent,
    LiComponent,
    ChatComponent,
    NavbarComponent,
    DocumentIndexComponent,
    DocumentIndexBoxComponent, ButtonchatComponent, MatinputComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  exports: [
    ButtonComponent,
    ButtonchatComponent,
    ButtonlistComponent,
    ImageComponent,
    InputComponent,
    LabelComponent,
    FormComponent,
    LiComponent,
    ChatComponent,
    NavbarComponent,
    MatinputComponent,
    DocumentIndexComponent,
    DocumentIndexBoxComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatRippleModule,
  ]
})
export class SharedModule { }
