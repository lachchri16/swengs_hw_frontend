import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SongListComponent} from './song-list/song-list.component';
import {SongFormComponent} from './song-form/song-form.component';
import {ArtistFormComponent} from './artist-form/artist-form.component';


const routes: Routes = [
  { path: 'song-list', component: SongListComponent},
  { path: 'song-form', component: SongFormComponent},
  { path: 'song-form/:id', component: SongFormComponent},
  { path: '', redirectTo: 'song-list', pathMatch: 'full'},
  { path: 'artist-form', component: ArtistFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
