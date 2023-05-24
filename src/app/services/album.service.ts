import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private url ='http://localhost:8080/album'

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.url + '/getAll')
  }
}
