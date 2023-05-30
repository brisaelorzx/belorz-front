import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/models/album';
import { Artist } from 'src/app/models/artist';
import { ArtistService } from 'src/app/services/artist.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup,FormControl, Validators, ValidationErrors } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit{
    public artistList: Artist[] = []
    artist = new Artist()
    artistForm: FormGroup

    /*
    public inputID: number
    // 'ID': new FormControl(this.artist.id, validators: [Validators.required, Validators.pattern ('^[0-9]*$'), Validators.minLength(8)], asyncValidators: this.checkID.bind(this), updateOn: 'blur'])
    public inputName: string
    public inputEdad: number
    public inputPopul: number
    public inputLista: Album[] = []
    */
    // View
    public inputIDV: number
    public inputNameV: string
    public inputEdadV: number
    public inputPopulV: number
    public inputListaV: Album[] = []

  constructor (private artistService: ArtistService, private modalService: NgbModal){}


  ngOnInit(): void {
    this.artist.id = 0
    this.artist.nameArtist=''
    this.artist.age= 0
    this.artist.popularity= 0
    this.artist.albums= []
    this.artistForm = new FormGroup ({
      'id' : new FormControl(this.artist.id, Validators.required),
      'nameArtist': new FormControl(this.artist.nameArtist, Validators.required),
      'age': new FormControl(this.artist.age, Validators.required),
      'popularity': new FormControl(this.artist.popularity, Validators.required),
      'albums': new FormControl(this.artist.albums, Validators.required)
    })
   


    this.artistService.getAll().subscribe(artistResponse => {
      alert("Okay");
      this.artistList=artistResponse 
      console.log(this.artistList)

    }, error => {
          console.error(error)
    }
    );
    
  }
  get id() {return this.artistForm.get('id')}
  get nameArtist() {return this.artistForm.get('nameArtist')}
  get age() {return this.artistForm.get('age')}
  get popularity(){return this.artistForm.get('popularity')}
  get albums(){return this.artistForm.get('albums')}



  delete(id: number) {
    this.artistService.delete(id).subscribe(() => {
      location.reload()
      alert('Baja Exitosa!')
    }, error => {
      console.error(error)
      if (error.status === 500) {
        alert('Error: el artista no puede ser borrado')
      }
    })

    
  }

  view(ver: any, a: Artist){
    this.inputIDV= a.id
    this.inputNameV=a.nameArtist
    this.inputEdadV=a.age
    this.inputPopulV=a.popularity
    this.inputListaV=a.albums
    this.modalService.open(ver).result.then(() => {
      let artist = new Artist()
        artist.id = this.inputIDV
        artist.nameArtist= this.inputNameV
        artist.age= this.inputEdadV
        artist.popularity= this.inputPopulV
        artist.albums = this.inputListaV
        alert(this.inputIDV)
        this.artistService.edit(this.inputIDV, artist).subscribe( () => {
          location.reload()
        }, error => {
          console.error(error)
          alert('Error' + error.error.message)
        })
        
    }
    )

  }

  add(){
     
      let artist = new Artist()
        artist.id = this.id.value
        artist.nameArtist= this.nameArtist.value
        artist.age= this.age.value
        artist.popularity= this.popularity.value
        artist.albums = this.albums.value
      this.artistService.add(artist).subscribe(() => {
        alert('Alta exitosa')
        document.getElementsByTagName("input")[0].focus()
        location.reload()
    }, error => {
        console.error(error)
        alert('Error: ' + error.error.message)
        document.getElementsByTagName('input')[0].focus()
        

    })
  
  

}
}
