import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../service/chat.service';
import { IMessage } from '../interface/interface.IMessage';
import * as firebase from 'firebase/app';
import { MESSAGES_CONTAINER_ID } from '@angular/cdk/a11y';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('messageA', { read: ElementRef }) messageContainer: ElementRef;

  messages: IMessage[] = [];
  message: IMessage;
  messagesLength = 0;

  constructor(private chatService: ChatService) { }

  sendMessage() {
    const user = JSON.parse(localStorage.getItem('user'));
    const timestamp = Date.now();
    this.message.time = timestamp;
    const randomId = '_' + Math.random().toString(36).substr(2, 9);
    this.message.id = randomId;
    if (this.message.text !== '') {
      this.chatService.sendMessage(this.message);
    }
    if (user.photoURL) {
      this.message = {
        id: null,
        time: null,
        text: '',
        name: user.displayName,
        photoUrl: user.photoURL,
      };
    } else {
      this.message = {
        id: null,
        time: null,
        text: '',
        name: user.displayName,
        photoUrl: '../../assets/piesel.jpg',
      };
    }
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user.photoURL) {
      this.message = {
        id: null,
        time: null,
        text: '',
        name: user.displayName,
        photoUrl: user.photoURL,
      };
    } else {
      this.message = {
        id: null,
        time: null,
        text: '',
        name: user.displayName,
        photoUrl: '../../assets/piesel.jpg',
      };
    }
    this.chatService
      .getMessages()
      .subscribe((message: IMessage) => {
        this.messages.push(message);
      });

    this.chatService
    .getDeletedMessgaes()
    .subscribe((message: IMessage) => {
      const a = this.messages.findIndex(function(element) {
        return element.id === message.id;
      });
      this.messages[a].text = message.text;
      this.messages[a].name = message.name;
      this.messages[a].photoUrl = message.photoUrl;
    });
  }

  ngAfterViewChecked() {
    if (this.messages.length !== this.messagesLength) {
      this.messagesLength = this.messages.length;
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    const nativeElement = this.messageContainer.nativeElement;

    nativeElement.scrollTop = nativeElement.scrollHeight - nativeElement.clientHeight + 1;
  }

  deleteMessage(message) {
    const a = this.messages.findIndex((element) => element.id === message.id);
    this.messages[a].text = 'Wiadomość usunięta';
    this.messages[a].name = '??????????';
    this.messages[a].photoUrl = '"../../assets/avatar-default-icon.png';
    this.chatService.deleteMessage(this.messages[a]);
  }
}
