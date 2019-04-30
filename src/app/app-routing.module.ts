import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberlistComponent } from './memberlist/memberlist.component';

const routes: Routes = [
  {path:'memberlist/:group_number', component:MemberlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
