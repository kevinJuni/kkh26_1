import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberlistComponent } from './memberlist/memberlist.component';
import { ResisterComponent } from './resister/resister.component';

const routes: Routes = [
  {path:'memberlist/:group_number', component:MemberlistComponent},
  {path:'memberlist/:group_number/resister', component:ResisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
