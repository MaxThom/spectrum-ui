import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Anim, Segment } from 'src/model/animation.model';

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
    @Inject(MAT_DIALOG_DATA) public data: SegmentDialogData) {
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
    console.log(this.segments[i])
    if (i !== undefined) {
      this.target = i
    } else {
      this.target = -1
    }

  }

  onSegmentDeleteClick(i: number): void {
    console.log("Delete " + this.segments[i])
    this.segments.splice(i, 1)
    this.target = this.segments.length-1
  }

  onSegmentAddClick(): void {
    console.log("Add")
    this.segments.push({start: 0, end: 144})
    this.target = this.segments.length-1
  }

}
