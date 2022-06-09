import { Component } from '@angular/core';
import { Anim } from 'src/model/animation.model';
import { Discovery } from 'src/model/discovery.model';
import { SpectrumService } from './service/spectrum.service';

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

  constructor(private spectrumService: SpectrumService) {
    
  }

  ngOnInit() {
    console.log("Discovering animations!")
    this.spectrumService.getDiscovery().subscribe(
      {
        next: discovery => {
          console.log("There was a discovery!", discovery)
          this.discovery = discovery
          this.discovered = true
        },
        error: err => {
            console.error('There was an error!', err);
        }
      }
    )

    this.spectrumService.getAnimation().subscribe(
      {
        next: anim => {
          console.log("There are animations running!", anim)
          this.runningAnim = anim;
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
}

