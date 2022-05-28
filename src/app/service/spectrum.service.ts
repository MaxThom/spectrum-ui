import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Segment } from '../model/segment.animation';
import { Anim } from '../model/animation.model';

@Injectable()
export class SpectrumService {

    url: string = "http://monstera:8080/api"

    constructor(private http: HttpClient) { }

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
        
        return this.http.post<Anim>(`${this.url}/animation/`, anim)
    }
}