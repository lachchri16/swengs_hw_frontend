import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {LabelService} from '../service/label.service';
import {ArtistService} from '../service/artist.service';
import {Song} from '../song';
import {SongService} from '../service/song.service';

@Component({
  selector: 'app-song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.scss']
})
export class SongFormComponent implements OnInit {

  songFormGroup;
  artistOptions;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute,
              private router: Router, private artistService: ArtistService, private songService: SongService) {
  }

  ngOnInit() {
    this.songFormGroup = this.fb.group({
      id: [null],
      title: ['', [Validators.required, this.badWordValidator()]],
      genre: [null, Validators.required],
      release_date: [null],
      lyrics: [''],
      duration: ['', Validators.pattern(new RegExp('(?:[01]\\d|2[0123]):(?:[012345]\\d):(?:[012345]\\d)'))],
      // Dieser Validator funktioniert aus irgendeinem Grund nur, wenn man im duration field zahlen eingibt.
      artist: [[], Validators.required],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get('/api/song/' + id + '/get')
        .subscribe((response: Song) => {
          const lyrics = JSON.parse(response.lyrics);
          this.songFormGroup.patchValue(response);
          this.songFormGroup.patchValue({lyrics});
        });
    }

    this.artistService.retrieveArtistOptions().subscribe((result) => {
      this.artistOptions = result;
    });
  }

  createSong() {
    const song = this.songFormGroup.value;
    song.lyrics = JSON.stringify(this.songFormGroup.value.lyrics);
    if (song.id) {
      this.songService.updateSong(song)
        .subscribe(() => {
          alert('updated successfully');
        });
    } else {
      this.songService.createSong(song)
        .subscribe((response: any) => {
          this.router.navigate(['/song-form/' + response.id]);
          alert('created successfully');
        });
    }
  }

  badWordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = /bad word/.test(control.value);
      return forbidden ? {badWord: {value: control.value}} : null;
    };
  }

}
