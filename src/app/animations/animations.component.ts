import {Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Anim } from 'src/model/animation.model';
import { AnimDiscovery } from 'src/model/discovery.model';
import { SpectrumService } from '../service/spectrum.service';

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.css']
})
export class AnimationsComponent implements OnInit {
  animations: AnimDiscovery[] = []
  options: Record<string, string> = {}
  runningAnim: Anim[] = []

  constructor(private spectrumService: SpectrumService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.spectrumService.isDiscovered()) {
      this.animations = this.spectrumService.discovery.animations;
      this.options = this.spectrumService.discovery.options;
    } else {
      this.spectrumService.discovery$.subscribe(
        {
          next: discovery => {
            console.log("There was a discovery!", discovery)
            this.animations = discovery.animations
            this.options = discovery.options
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

    this.spectrumService.runningAnims$.subscribe(
      {
        next: anim => {
          console.log("There are animations running!", anim)
          this.runningAnim = anim;
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

  isAnimRunning(anim: string) {
    if (this.runningAnim.filter(x => x.animation == anim).length > 0) {
      return "primary"
    }
    return ""
  }

}
