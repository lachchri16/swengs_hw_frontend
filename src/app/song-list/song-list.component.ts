import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SongService} from '../service/song.service';
import {GenreService} from '../service/genre.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

  songs: any[];
  displayedColumns = ['title', 'genre', 'id'];

  constructor(private http: HttpClient, private songService: SongService, public genreService: GenreService) {
  }

  ngOnInit() {
    this.songService.getSongs()
      .subscribe((response: any[]) => {
        this.songs = response;
      });
  }

  deleteSong(song: any) {
    this.songService.deleteSong(song)
      .subscribe(() => {
        this.ngOnInit();
      });
  }

}
