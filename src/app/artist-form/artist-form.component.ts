import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {LabelService} from '../service/label.service';

@Component({
  selector: 'app-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.scss']
})
export class ArtistFormComponent implements OnInit {

  artistFormGroup;
  labelOptions;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router,
              private labelService: LabelService) {
  }

  ngOnInit() {
    this.artistFormGroup = this.fb.group({
      id: [null],
      stage_name: ['', Validators.required],
      first_name: [''],
      last_name: [''],
      label: [''],
      year_of_birth: [],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get('/api/artist/' + id + '/get')
        .subscribe((response) => {
          this.artistFormGroup.patchValue(response);
        });
    }

    this.labelService.retrieveLabelOptions().subscribe((result) => {
      this.labelOptions = result;
    });
  }

  createArtist() {
    const artist = this.artistFormGroup.value;
    if (artist.id) {
      this.http.put('/api/artist/' + artist.id + '/update', artist)
        .subscribe(() => {
          alert('updated successfully');
        });
    } else {
      this.http.post('/api/artist/create', artist)
        .subscribe((response: any) => {
          this.router.navigate(['/artist-form/' + response.id]);
          alert('created successfully');
        });
    }
  }

}
