import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { SpectrumService } from './service/spectrum.service';
import { AnimationsComponent } from './animations/animations.component';
import { AnimationDetailComponent } from './animation-detail/animation-detail.component';
import { SegmentsComponent } from './segments/segments.component';
import { OptionsComponent } from './options/options.component';
import { AnimationButtonComponent } from './animation-button/animation-button.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimationsComponent,
    AnimationDetailComponent,
    SegmentsComponent,
    OptionsComponent,
    AnimationButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Must be after Browser Module
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  providers: [SpectrumService],
  bootstrap: [AppComponent]
})
export class AppModule { }
