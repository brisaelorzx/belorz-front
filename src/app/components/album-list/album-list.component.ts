import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit{

  constructor(private albumService: AlbumService){}
  ngOnInit(): void {
    this.albumService.getAll().subscribe(albumResponse => {
      alert("Okay");
      console.log(albumResponse)

    }, error => {
          console.error(error)
    }
    );
    
  }

}
