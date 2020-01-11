import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SongListComponent} from './song-list/song-list.component';
import {SongFormComponent} from './song-form/song-form.component';
import {ArtistFormComponent} from './artist-form/artist-form.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'song-list', pathMatch: 'full'},
  { path: 'song-list', component: SongListComponent, canActivate: [AuthGuard]},
  { path: 'song-form', component: SongFormComponent, canActivate: [AuthGuard]},
  { path: 'song-form/:id', component: SongFormComponent, canActivate: [AuthGuard]},
  { path: 'artist-form', component: ArtistFormComponent, canActivate: [AuthGuard]},
  { path: 'artist-form/:id', component: ArtistFormComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
