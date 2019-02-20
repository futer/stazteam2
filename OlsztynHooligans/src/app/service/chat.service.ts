import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = environment.apiUrl;
  public apiUrl = environment.apiUrl;

  private socket;

  constructor(private http: HttpClient) {
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

  banuser(data): Observable<any> {
    console.log(data);
    const payload = {
      uid: data,
    };
    const url = `${this.apiUrl}/chat`;
    console.log(url);
    return this.http.put(url, payload);
  }

  public banMessage(uid) {
    console.log('b');
    this.socket.emit('ban-user', uid);
  }

  public getBanMessage = () => {
    return Observable.create((observer) => {
      this.socket.on('ban-user', (message) => {
        observer.next(message);
      });
    });
  }

  getuser(uid): Observable<any> {
    console.log('a');
    const data = {
      uid : uid,
    };
    return this.http.post<any>(this.apiUrl + '/chat', data).pipe();
  }
}
