import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Artist } from '../models/artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private url ='http://localhost:8080/artist'

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.url + '/getAll')
  }
  delete (id: number): Observable <any> {
    return this.http.post(this.url + '/' + id +'/delete', null)
  }

  add( artist: Artist): Observable <any>{
        return this.http.post(this.url +'/addArtist', artist)}

  edit (id: number, artist: Artist): Observable<any>{
          return this.http.post(this.url +'/'+id+'/update', artist)
        }
      
}
  
