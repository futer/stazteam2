import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase/app';
import { link } from 'fs';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor(private af: AngularFireStorage) { }

  image: string;

  pushUpload(upload: File) {
    if (upload != null) {
      const randomId = Math.random().toString(36).substring(2);
      const storageRef = firebase.storage().ref().child(randomId);
      const uploadTask = storageRef.put(upload);
      this.image = 'https://firebasestorage.googleapis.com/v0/b/' +
        storageRef.bucket + '/o/' + storageRef.fullPath + '?alt=media';
    }
  }
}
