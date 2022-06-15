import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Anim, Segment } from 'src/model/animation.model';
import { SpectrumService } from '../service/spectrum.service';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface SegmentDialogData {
  target: number
  segments: Segment[]
}

@Component({
  selector: 'app-segments',
  templateUrl: './segments.component.html',
  styleUrls: ['./segments.component.css']
})
export class SegmentsComponent implements OnInit {

  segments: Segment[] = []
  target: number = -1;

  constructor(public dialogRef: MatDialogRef<SegmentsComponent, SegmentDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: SegmentDialogData, private spectrumService: SpectrumService,
    private _snackBar: MatSnackBar) {
      this.segments = data.segments;
      this.target = data.target;
      console.log(this.segments)

      dialogRef.backdropClick().subscribe(result => {
        dialogRef.close({target: this.target, segments: this.segments});
      });
    }

  ngOnInit(): void {
  }

  onClosingDialog(): void {
    this.dialogRef.close({target: this.target, segments: this.segments});
  }

  onSegmentClick(i: number): void {
    if (i !== undefined) {
      this.target = i
    } else {
      this.target = -1
    }

  }

  onDeleteAllSegmentsClick() {
    this.segments = []
    this.target = -1
    this.spectrumService.deleteAnimation(-1).subscribe(
      {
        next: msg => {
          console.log(msg)          
        },
        error: err => {
          console.log(err)
          this._snackBar.open(`Moew (oo).,., !`, ``, {
            panelClass: ['red-snackbar'],
            duration: 3000
          });
        }  
      })
  }

  onSegmentDeleteClick(i: number): void {
    this.segments.splice(i, 1)
    this.target = this.segments.length-1

    this.spectrumService.deleteAnimation(i).subscribe(
    {
      next: msg => {
        console.log(msg)
      },
      error: err => {
        console.log(err)
        this._snackBar.open(`Moew (oo).,., !`, ``, {
          panelClass: ['red-snackbar'],
          duration: 3000
        });
      }  
    })      
  }

  onSegmentAddClick(): void {
    let start = 0
    let end = parseInt(this.spectrumService.discovery.options["ledCount"]) / 2    
    if (this.segments.length > 0) {
      start = this.segments[this.segments.length-1].end
      end = this.segments[this.segments.length-1].end - this.segments[this.segments.length-1].start + start      
    }
    this.segments.push({start: start, end: end})
    this.target = this.segments.length-1
  }

}
