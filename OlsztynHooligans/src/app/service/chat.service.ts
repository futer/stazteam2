import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = environment.apiUrl;
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('new-message', (message) => {
        observer.next(message);
      });
    });
  }

  public deleteMessage(message) {
    this.socket.emit('delete-message', message);
  }

  public getDeletedMessgaes = () => {
    return Observable.create((observer) => {
      this.socket.on('delete-message', (message) => {
        observer.next(message);
      });
    });
  }
}
