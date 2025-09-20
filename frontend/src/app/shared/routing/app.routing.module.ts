import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../pages/auth/login/login.component';
import { ActivityListComponent } from '../../pages/activity-list/activity-list.component';
import { PersonListComponent } from '../../pages/person-list/person-list.component';
import { LocationListComponent } from '../../pages/location-list/location-list.component';
import { RedirectGuard } from '../../core/guards/redirect-guard/redirect-guard.service';
import { AuthGuard } from '../../core/guards/auth-guard/auth-guard.service';
import { RegisterComponent } from '../../pages/auth/register/register.component';
const appRoutes: Routes = [
  { path: '', redirectTo: 'activities', pathMatch: 'full' },
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    children: [
      { path: 'activities', component: ActivityListComponent },
      { path: 'persons', component: PersonListComponent },
      { path: 'locations', component: LocationListComponent },
    ],
  },
  { path: 'login', component: LoginComponent, canActivate: [RedirectGuard] },
  { path: 'register', component: RegisterComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
