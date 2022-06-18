import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimationDetailComponent } from './animation-detail/animation-detail.component';
import { AnimationsComponent } from './animations/animations.component';
import { OptionsComponent } from './options/options.component';

const routes: Routes = [
  { path: 'anims/:name', component: AnimationDetailComponent },
  { path: 'anims', component: AnimationsComponent },
  { path: 'settings', component: OptionsComponent },
  { path: '',   redirectTo: '/anims', pathMatch: 'full' },
  { path: '**',  redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
