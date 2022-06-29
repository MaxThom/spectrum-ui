import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AnimDiscovery, AnimOptions, Discovery } from 'src/model/discovery.model';
import { SpectrumService } from '../service/spectrum.service';

@Component({
  selector: 'app-animation-detail',
  templateUrl: './animation-detail.component.html',
  styleUrls: ['./animation-detail.component.css']
})
export class AnimationDetailComponent implements OnInit {

  name: string | null = ""
  discoAnim: AnimDiscovery | undefined 
  options: [string, AnimOptions][] = [];
  
  constructor(private route: ActivatedRoute, private spectrumService: SpectrumService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.name = this.route.snapshot.paramMap.get('name');
      this.discoAnim = this.spectrumService.discovery.animations.find(x => x.animation === this.name)
      console.log(this.discoAnim)
      this.options = Object.entries(this.discoAnim?.options!);
    });
  }

  isAnimRunning(anim: string) {
    if (this.spectrumService.runningAnim.filter(x => x.animation == anim).length > 0) {
      return "primary"
    }
    return ""
  }

  getAnimOptions() {
    return this.options;
  }

  onValuesResetClick() {

  }

  getParamTitle(title: string): string {
    let tmp = title.replace("_", " ").replace("-", " ").trim();
    return tmp.charAt(0).toUpperCase() + tmp.slice(1).toLowerCase();
  }

}
