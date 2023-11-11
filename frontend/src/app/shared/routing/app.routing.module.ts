import{ NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityListComponent } from '../../pages/activity-list/activity-list.component';
import { PersonListComponent } from 'src/app/pages/person-list/person-list.component';
const appRoutes: Routes = [
    { path:'',redirectTo: 'activities', pathMatch:'full' },
    { path:'activities',component: ActivityListComponent },
    { path:'persons',component: PersonListComponent },
]
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}
