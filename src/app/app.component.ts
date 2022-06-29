import { Component } from '@angular/core';
import { Anim } from 'src/model/animation.model';
import { Discovery } from 'src/model/discovery.model';
import { SpectrumService } from './service/spectrum.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SegmentsComponent } from './segments/segments.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spectrum-ui';
  discovery: Discovery = { options: {}, animations: [] }
  discovered: boolean = false
  isSegmentDialogOpen: boolean = false

  constructor(public dialog: MatDialog, 
    private spectrumService: SpectrumService,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    console.log("Discovering animations!")
    this.spectrumService.discovery$.subscribe(
      {
        next: discovery => {
          console.log("There was a discovery!", discovery)
          this.discovery = discovery
          this.spectrumService.discovery = discovery;
          this.discovered = true
          this._snackBar.open(`Moew (oo).,., !`, ``, {
            panelClass: ['green-snackbar'],
            duration: 3000
          });
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

    this.spectrumService.runningAnims$.subscribe(
      {
        next: anim => {
          console.log("There are animations running!", anim)
          this.spectrumService.runningAnim = anim;
          this.spectrumService.segments = anim.map(x => x.segment);
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

  onCodeClick() {
    window.open("https://github.com/MaxThom/spectrum-ui", "_blank");
  }

  onDefaultAnimClick() {
    console.log("Playing default anim!")
    this.spectrumService.setDefaultAnimation().subscribe(
      {
        next: anim => {
          console.log("There was an anim!", anim)
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

  openSegmentDialog(event: any) {
    let width = 275;
    let offsetTop = event.srcElement.id === "segmentBtn" ? 18 : 0;
    let el = event.srcElement;
    while(el){
        offsetTop += el.offsetTop;
        el = el.parentElement;
    }

    this.isSegmentDialogOpen = true
    const dialogRef = this.dialog.open(SegmentsComponent, {
      width: `${width}px`,
      data: {target: this.spectrumService.targetIndex, segments: this.spectrumService.segments},
      hasBackdrop: true,
      backdropClass:'foo',
      panelClass: ['nopadding-dialog-container', 'nobackground-dialog-container'],
      position: {
        top: `${offsetTop}px`,
        left: `${window.innerWidth-width-8}px`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.spectrumService.targetIndex = result.target;
      this.spectrumService.segments = result.segments;
      this.isSegmentDialogOpen = false
    });
  }

  getSegmentString(): string {
    let msg = ""
    if (this.spectrumService.targetIndex === -1) {
      msg = "All"
    } else if (this.spectrumService.segments[this.spectrumService.targetIndex]
      && this.spectrumService.segments[this.spectrumService.targetIndex].start != undefined
      && this.spectrumService.segments[this.spectrumService.targetIndex].end != undefined) {
      msg = this.spectrumService.segments[this.spectrumService.targetIndex].start.toString() + "-" + this.spectrumService.segments[this.spectrumService.targetIndex].end.toString()
    }     

    return msg
  }

  onPowerClick(): void {
    let anim: Anim = {
      index: -1,
      segment: { start: 0, end: parseInt(this.spectrumService.discovery.options["ledCount"])},
      animation: "Clear",      
      options: {},
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

  onLogoClick(): void {
    this.router.navigate([`/`]);
  }
}

