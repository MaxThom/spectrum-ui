import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Anim } from 'src/model/animation.model';
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


  constructor(private spectrumService: SpectrumService, private router: Router) { }

  ngOnInit(): void { 
  }

  onAnimClick(): void {
    var opt:Record<string, string> = {};
    Object.entries(this.animDisco.options).forEach((x) => {
        opt[x[0]] = x[1].default
    })

    let anim: Anim = {
      index: -1,
      segment: {
          start: 0,
          end: 144
      },
      animation: this.animDisco.animation,      
      options: opt,
    }

    this.spectrumService.setAnimation(anim).subscribe(
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