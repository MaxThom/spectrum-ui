import { Component, Input, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SpectrumService } from '../service/spectrum.service';

@Component({
  selector: 'app-brightness',
  templateUrl: './brightness.component.html',
  styleUrls: ['./brightness.component.css']
})
export class BrightnessComponent implements OnInit {

  @Input() options: Record<string, string> = {}

  brightness: number = 127

  constructor(private spectrumService: SpectrumService, 
    private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.brightness = parseInt(this.options["brightness"])
  }

  formatLabel(value: number) {
    return value;
  }

  onValueChanged(value: MatSliderChange) {
    console.log(value)
    if (value.value != undefined)
      this.spectrumService.setBrightness(value.value).subscribe(
        {
          next: brightness => {
            console.log("There was a brightness!", brightness)
            if (brightness.message) {
              this._snackBar.open(brightness.message, ``, {
                panelClass: ['yellow-snackbar'],
                duration: 3000
              });
            }
          },
          error: err => {
              console.error('There was an error!', err);
              this._snackBar.open(`Moew (oo).,., !`, ``, {
                panelClass: ['red-snackbar'],
                duration: 3000
              });
          }
        }
      )
  }

  onSliderMoved(value: MatSliderChange) {
    if (value.value != undefined)
      this.spectrumService.setBrightness(value.value).subscribe(
        {
          next: brightness => {
            console.log("There was a brightness!", brightness)        
            if (brightness.message) {
              this._snackBar.open(brightness.message, ``, {
                panelClass: ['yellow-snackbar'],
                duration: 3000
              });
            }
          },
          error: err => {
              console.error('There was an error!', err);
              this._snackBar.open(`Moew (oo).,., !`, ``, {
                panelClass: ['red-snackbar'],
                duration: 3000
              });
          }
        }
      )
  }

  onSettingsClick() {
    this.router.navigate([`/settings`]);
  }
}
