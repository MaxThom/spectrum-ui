import { Component } from '@angular/core';
import { Anim } from 'src/model/animation.model';
import { Discovery } from 'src/model/discovery.model';
import { SpectrumService } from './service/spectrum.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SegmentsComponent } from './segments/segments.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spectrum-ui';
  discovery: Discovery = { options: {}, animations: [] }
  discovered: boolean = false
  runningAnim: Anim[] = []

  constructor(public dialog: MatDialog, private spectrumService: SpectrumService) { }

  ngOnInit() {
    console.log("Discovering animations!")
    this.spectrumService.discovery$.subscribe(
      {
        next: discovery => {
          console.log("There was a discovery!", discovery)
          this.discovery = discovery
          this.spectrumService.discovery = discovery;
          this.discovered = true
        },
        error: err => {
            console.error('There was an error!', err);
        }
      }
    )

    this.spectrumService.runningAnims$.subscribe(
      {
        next: anim => {
          console.log("There are animations running!", anim)
          this.runningAnim = anim;
          this.spectrumService.segments = anim.map(x => x.segment);
        },
        error: err => {
            console.error('There was an error!', err);
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
    });
  }
}

