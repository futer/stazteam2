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

@NgModule({
  declarations: [ButtonComponent, 
    ButtonlistComponent,
    ImageComponent, 
    InputComponent, 
    LabelComponent, 
    FormComponent, 
    LiComponent, 
    ChatComponent, 
    NavbarComponent, 
    DocumentIndexComponent, 
    DocumentIndexBoxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponent,
    ButtonlistComponent,
    ImageComponent,
    InputComponent,
    LabelComponent,
    FormComponent,
    LiComponent,
    ChatComponent,
    NavbarComponent,
    DocumentIndexComponent,
    DocumentIndexBoxComponent
  ]
})
export class SharedModule { }
