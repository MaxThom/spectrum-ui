import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimationDetailComponent } from './animation-detail/animation-detail.component';
import { AnimationsComponent } from './animations/animations.component';

const routes: Routes = [
  { path: 'anims/:name', component: AnimationDetailComponent },
  { path: 'anims', component: AnimationsComponent },
  { path: '',   redirectTo: '/anims', pathMatch: 'full' },
  { path: '**',  redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
