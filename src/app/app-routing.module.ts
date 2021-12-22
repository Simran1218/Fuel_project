import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStationComponent } from './add-station/add-station.component';
import { HomeComponent } from './home/home.component';
import { EditStationComponent } from './view-station/edit-station/edit-station.component';
import { ListStationComponent } from './view-station/remove-station/list-station.component';
import { ViewStationComponent } from './view-station/view-station.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  // {path: '', component: HomeComponent}
  // {path: 'view-station', component: ViewStationComponent},
  // {path: 'add-station', component: AddStationComponent},
  // {path: 'edit-station', component: EditStationComponent},
  // {path: 'list-station', component: ListStationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
