import { Injectable } from '@angular/core';
import { IBookmark } from '../interface/interface.IBookmark';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  constructor(private http: HttpClient) { }

  bookmarkkey: string;

  postbookmark(data: IBookmark): Observable<any> {
    return this.http.post<IBookmark>(apiUrl + '/bookmarks', data).pipe();
  }

  putbookmark(data: IBookmark): Observable<any> {
    return this.http.put<IBookmark>(apiUrl + '/bookmarks', data).pipe();
  }

  deletebookmark(data: IBookmark): Observable<any> {
    const url = `${apiUrl}/bookmarks/${data.key}`;
    return this.http.delete<IBookmark>(url).pipe();
  }
  getbookmarks(): Observable<IBookmark[]> {
    return this.http.get<IBookmark[]>(apiUrl + '/bookmarks').pipe();
  }
}