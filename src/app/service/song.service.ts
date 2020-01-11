import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) {
  }

  getSongs() {
    return this.http.get('/api/song/list');
  }

  createSong(song) {
    return this.http.post('/api/song/create', song);
  }

  updateSong(song) {
    return this.http.put('/api/song/' + song.id + '/update', song);
  }

  getSong(song) {
    return this.http.get('/api/song/' + song.id + '/get');
  }

  deleteSong(song) {
    return this.http.delete('/api/song/' + song.id + '/delete');
  }
}
