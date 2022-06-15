import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Anim, Segment } from 'src/model/animation.model';
import { AnimDiscovery } from 'src/model/discovery.model';
import { SpectrumService } from '../service/spectrum.service';

@Component({
  selector: 'app-animation-button',
  templateUrl: './animation-button.component.html',
  styleUrls: ['./animation-button.component.css']
})
export class AnimationButtonComponent implements OnInit {

  @Input() animDisco: AnimDiscovery = { animation: "", options: {}}
  @Input() isCurrent: string = ""

  timeoutHandler: any = null;


  constructor(private spectrumService: SpectrumService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void { 
  }

  onAnimClick(): void {
    var opt:Record<string, string> = {};
    Object.entries(this.animDisco.options).forEach((x) => {
        opt[x[0]] = x[1].default
    })

    let seg: Segment = {start:0, end: parseInt(this.spectrumService.discovery.options["ledCount"])}
    if (this.spectrumService.targetIndex !== -1) {
      seg = this.spectrumService.segments[this.spectrumService.targetIndex]
    }

    let anim: Anim = {
      index: this.spectrumService.targetIndex,
      segment: seg,
      animation: this.animDisco.animation,      
      options: opt,
    }

    this.spectrumService.setAnimation(anim).subscribe(
      {
        next: anim => {
          console.log("There was an anim!", anim)
          if (anim.message) {
            this._snackBar.open(anim.message, ``, {
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

  onMouseDown(): void {
    console.log("down");
    this.timeoutHandler = setTimeout(() => {      
      console.log("long press");
      this.router.navigate([`/anims/${this.animDisco.animation}`]);
    }, 1000);
  }

  onMouseUp(): void {
    console.log("up");
    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler);
      console.log("canceled");
    }
  }
}