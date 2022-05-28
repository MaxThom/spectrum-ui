import { Component } from '@angular/core';
import { SpectrumService } from './service/spectrum.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spectrum-ui';

  constructor(private spectrumService: SpectrumService) {

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

