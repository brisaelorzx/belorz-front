import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Album } from '../models/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private url ='http://localhost:8080/album'

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.url + '/getAll')
  }

  delete(id: number): Observable <any> {
    return this.http.post(this.url + '/' + id + '/delete', null)

  }

  add (album: Album): Observable <any> {
    console.log(album.artist)
    return this.http.post(this.url +'/addAlbum', album)

  }

  edit (id: number, album: Album): Observable <any> {
    return this.http.post(this.url +'/'+id+'/update', album)

  }
}


