import {Component, Input, OnInit } from '@angular/core';
import { Anim } from 'src/model/animation.model';
import { AnimDiscovery } from 'src/model/discovery.model';

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.css']
})
export class AnimationsComponent implements OnInit {
  @Input() animations: AnimDiscovery[] = []
  @Input() runningAnim: Anim[] = []

  constructor() { }

  ngOnInit(): void {
  }

  isAnimRunning(anim: string) {
    if (this.runningAnim.filter(x => x.animation == anim).length > 0) {
      return "primary"
    }

    return ""
  }

}
