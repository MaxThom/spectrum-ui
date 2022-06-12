import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError, retry, shareReplay } from 'rxjs/operators';
import { Anim } from '../../model/animation.model';
import { Discovery } from '../../model/discovery.model';
import { environment } from '../../environments/environment';

@Injectable()
export class SpectrumService {
    url: string = `${this.getSpectrumUrl()}api`
    discovery: Discovery = { options: {}, animations: [] }
    discovery$: Observable<Discovery> = this.getDiscovery().pipe(shareReplay())
    runningAnims$: Observable<Anim[]> = this.getAnimation().pipe(shareReplay())
    



    constructor(private http: HttpClient) { }

    getDiscovery(): Observable<Discovery> {
        return this.http.get<Discovery>(`${this.url}/discovery`)
    }

    getAnimation(): Observable<Anim[]> {        
        return this.http.get<Anim[]>(`${this.url}/animation`)
    }

    setAnimation(anim: Anim): Observable<Anim> {
        return this.http.post<Anim>(`${this.url}/animation`, anim)
    }

    setDefaultAnimation(): Observable<Anim> {
        let anim: Anim = {
            index: -1,
            segment: {
                start: 0,
                end: 144
            },
            animation: "Maze",
            options: {
                count: "13",
                turn_chance: "2",
                wait: "20", 
                color: "0x00ff00ff",
                contact_color: "0x7733bbff"
            }

        }
        
        return this.http.post<Anim>(`${this.url}/animation`, anim)
    }

    getSpectrumUrl(): string {
        let url: string = ""
        if (environment.spectrumUrl) 
            url = environment.spectrumUrl;
        else
            url = window.location.protocol + "//" + window.location.hostname + ":8080/";

        console.log("Spectrum " + url)
        return url;
    }

    isDiscovered(): boolean {
        return this.discovery.animations.length != 0;
    }
}