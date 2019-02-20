import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../service/chat.service';
import { IMessage } from '../interface/interface.IMessage';
import * as firebase from 'firebase/app';

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
  isbanned = false;

  constructor(private chatService: ChatService) { }

  sendMessage() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!this.isbanned) {
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
          uid: user.uid,
        };
      } else {
        this.message = {
          id: null,
          time: null,
          text: '',
          name: user.displayName,
          photoUrl: '../../assets/piesel.jpg',
          uid: user.uid,
        };
      }
    } else {
      return;
    }
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('a');
    this.chatService.getuser(user.uid).subscribe(res => {
      console.log(res);
      this.isbanned = res.user[user.uid].is_banned;
      console.log(this.isbanned);
    });

    if (user.photoURL) {
      this.message = {
        id: null,
        time: null,
        text: '',
        name: user.displayName,
        photoUrl: user.photoURL,
        uid: user.uid,
      };
    } else {
      this.message = {
        id: null,
        time: null,
        text: '',
        name: user.displayName,
        photoUrl: '../../assets/piesel.jpg',
        uid: user.uid,
      };
    }

    // if(false) { return; }

    this.chatService
      .getMessages()
      .subscribe((message: IMessage) => {
        this.messages.push(message);
      });

    this.chatService
      .getDeletedMessgaes()
      .subscribe((message: IMessage) => {
        const a = this.messages.findIndex(function (element) {
          return element.id === message.id;
        });
        this.messages[a].text = message.text;
        this.messages[a].name = message.name;
        this.messages[a].photoUrl = message.photoUrl;
      });

    this.chatService
      .getBanMessage()
      .subscribe((uid: string) => {
        const tabMessageBanned = [];
        this.chatService.getuser(user.uid).subscribe(res => {
          this.isbanned = res.user[user.uid].is_banned;
        });
        for (let i = 0; i < this.messages.length; i++) {
          if (this.messages[i].uid === uid) {
            tabMessageBanned.push(i);
          }
        }
        for (let j = 0; j < tabMessageBanned.length; j++) {
          this.messages[tabMessageBanned[j]].text = 'Wiadomość usunięta';
          this.messages[tabMessageBanned[j]].name = 'banned';
          this.messages[tabMessageBanned[j]].photoUrl = '"../../assets/avatar-default-icon.png';
        }
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

  banUser(uid) {
    console.log('a');
    const tabMessageBanned = [];
    for (let i = 0; i < this.messages.length; i++) {
      if (this.messages[i].uid === uid) {
        tabMessageBanned.push(i);
      }
    }
    console.log(tabMessageBanned);
    for (let j = 0; j < tabMessageBanned.length; j++) {
      this.messages[tabMessageBanned[j]].text = 'Wiadomość usunięta';
      this.messages[tabMessageBanned[j]].name = 'banned';
      this.messages[tabMessageBanned[j]].photoUrl = '"../../assets/avatar-default-icon.png';
    }
    console.log(this.messages);
    this.chatService.banuser(uid).subscribe(res => {
    }, (err) => {
      console.log(err);
    });
    this.chatService.banMessage(uid);
  }
}
