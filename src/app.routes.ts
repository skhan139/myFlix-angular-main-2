import { Routes } from '@angular/router';
import { WelcomeViewComponent } from './app/welcome-view/welcome-view.component';
import { MovieCardComponent } from './app/movie-card/movie-card.component';
import { UserProfileComponent } from './app/user-profile/user-profile.component';

export const routes: Routes = [
  { path: 'welcome', component: WelcomeViewComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];
