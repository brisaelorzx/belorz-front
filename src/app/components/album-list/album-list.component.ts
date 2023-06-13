import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Album } from 'src/app/models/album';
import { Artist } from 'src/app/models/artist';
import { AlbumService } from 'src/app/services/album.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit{
      public albumList: Album[] = []
      public artistList: Artist[]
      album = new Album()
      albumForm: FormGroup

      // View
      public InputIDV: number
      public InputAlbumNameV:string
      public InputTotalTracksV: number
      public InputReleaseYearV: number
      public InputPopularityV: number
      public InputGenres: string
      public InputArtistName: string
      public InputArtistV: Artist


  constructor(private albumService: AlbumService,private modalService: NgbModal, private artistService: ArtistService){}
  ngOnInit(): void {
    this.album.id= 0
    this.album.albumName=""
    this.album.totalTracks= 0
    this.album.releaseYear= 0
    this.album.popularity= 0
    this.album.genres= ""
    this.album.artist= new Artist
    this.albumForm = new FormGroup ({
      'id': new FormControl(this.album.id, Validators.required),
      'albumName': new FormControl(this.album.albumName, Validators.required),
      'totalTracks': new FormControl (this.album.totalTracks, Validators.required),
      'releaseYear': new FormControl(this.album.releaseYear, Validators.required),
      'popularity': new FormControl(this.album.popularity, Validators.required),
      'genres': new FormControl(this.album.genres, Validators.required),
      'artist': new FormControl(this.album.artist, Validators.required)

    })

    this.artistService.getAll().subscribe(artistResponse => {
      this.artistList= artistResponse
      console.log(artistResponse)

    }, error => {
      console.error(error)

    }
      
      
      
      
      
      
      )


    this.albumService.getAll().subscribe(albumResponse => {
      this.albumList= albumResponse
      console.log(albumResponse)

    }, error => {
          console.error(error)
    }
    );
    
  }

  get id() {return this.albumForm.get('id')}
  get albumName(){return this.albumForm.get('albumName')}
  get totalTracks(){return this.albumForm.get('totalTracks')}
  get releaseYear(){return this.albumForm.get('releaseYear')}
  get popularity(){return this.albumForm.get('popularity')}
  get genres(){return this.albumForm.get('genres')}
  get artist(){return this.albumForm.get('artist')}



add () {
  let album = new Album()
  album.id= this.id.value
  album.albumName=this.albumName.value
  album.totalTracks=this.totalTracks.value
  album.releaseYear=this.releaseYear.value
  album.popularity=this.popularity.value
  album.genres= this.genres.value
  album.artist=this.artist.value
  console.log(album);
  
  this.albumService.add(album).subscribe(()=> {
    alert('Alta exitosa')
    document.getElementsByTagName("input")[0].focus()
    location.reload()
  }, error => {
    console.error(error)
    alert('Error: ' + error.error.message)
    document.getElementsByTagName("input")[0].focus()
  }
  )
}

delete(id: number) {
  this.albumService.delete(id).subscribe(() => {
    location.reload()
    alert('Baja Exitosa!')
  }, error => {
    console.error(error)
    if (error.status === 500) {
      alert('Error: el album no puede ser borrado')
    }
  })

  
}

view (ver: any, a: Album){
  this.InputIDV= a.id
  this.InputAlbumNameV= a.albumName
  this.InputTotalTracksV= a.totalTracks
  this.InputReleaseYearV= a.releaseYear
  this.InputPopularityV= a.popularity
  this.InputGenres= a.genres
  this.InputArtistName=a.artist.nameArtist
  this.InputArtistV= a.artist
  this.modalService.open(ver).result.then(() => {
    let album = new Album()
    album.id= this.InputIDV
    album.albumName=this.InputAlbumNameV
    album.totalTracks=this.InputTotalTracksV
    album.releaseYear=this.InputReleaseYearV
    album.popularity=this.InputPopularityV
    album.genres=this.InputGenres
    album.artist=this.InputArtistV
    alert(this.InputIDV)
    this.albumService.edit(this.InputIDV,album).subscribe( () => {
      location.reload()
    }, error => {
      console.error(error)
      alert('Error' + error.error.message)
}

)
  }


  )

}


}