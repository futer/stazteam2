import { Injectable } from '@angular/core';
import { IDocument} from '../interface/interface.IDocument';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  documentkey: string;

  postDocument(data: IDocument): Observable<any> {
    return this.http.post<IDocument>(apiUrl + '/documents', data).pipe();
  }

  putdocument(data: IDocument): Observable<any> {
    return this.http.put<IDocument>(apiUrl + '/documents', data).pipe();
  }

  deletedocument(id: IDocument): Observable<any> {
    const url = `${apiUrl}/documents/${id}`;
    return this.http.delete<IDocument>(url).pipe();
  }
  getDocuments(): Observable<IDocument[]> {
    return this.http.get<IDocument[]>(apiUrl + '/documents').pipe();
  }
}
