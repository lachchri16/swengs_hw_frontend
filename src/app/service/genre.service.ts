import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  genreNames = {
    r: 'Rock',
    j: 'Jazz',
    t: 'Techno',
    k: 'Classic',
  };

  constructor() {
  }
}
