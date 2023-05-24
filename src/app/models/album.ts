import { Artist } from "./artist"

export class Album {
    id: number
    albumName: string
    totalTracks: number
    releaseYear: number
    popularity: number
    genres: string
    artist: Artist
}