import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColdStartComponent } from './feature/cold-start/cold-start.component';

const routes: Routes = [
  {
    path: '',
    component: ColdStartComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
