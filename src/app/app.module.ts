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
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrightnessComponent } from './brightness/brightness.component';
import { ColorComponent } from './param-type/color/color.component';
import { IntComponent } from './param-type/int/int.component';
import { BoolComponent } from './param-type/bool/bool.component';
import { TimemsComponent } from './param-type/timems/timems.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimationsComponent,
    AnimationDetailComponent,
    SegmentsComponent,
    OptionsComponent,
    AnimationButtonComponent,
    BrightnessComponent,
    ColorComponent,
    IntComponent,
    BoolComponent,
    TimemsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Must be after Browser Module    
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule
  ],
  providers: [SpectrumService],
  bootstrap: [AppComponent]
})
export class AppModule { }
