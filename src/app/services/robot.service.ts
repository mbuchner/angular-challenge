import { Injectable } from '@angular/core';
import { GridService } from './grid.service';
import { Observable, BehaviorSubject, combineLatest, empty, forkJoin, of } from 'rxjs';
import { Location } from './../model/location.model';

@Injectable({ providedIn: 'root' })
export class RobotService {

  measures = [] as any[];

  location = {} as Location;

  location$ = new BehaviorSubject<any>(this.location);

  measures$ = new BehaviorSubject<any[]>(this.measures);

  constructor(private gridService: GridService) {
    this.location = { x: 10, y: 3 };
    this.publishLocation();
  }

  async measure() {
 //   await new Promise(resolve => {
 //           setTimeout(()=> {
    this.measures.push(this.gridService.readGridValue(this.location));
    this.measures$.next(Object.assign([], this.measures));
  //          }, 500)});
  }

  moveUp() {
    if (this.location.y != 0) {
      this.location.y = this.location.y - 1;
      this.publishLocation();
    } else {
      console.log("out of bounds");
    }
  }

  moveDown() {
    if (this.location.y != 15) {
      this.location.y = this.location.y + 1;
      this.publishLocation();
    } else {
      console.log("out of bounds");
    }
  }

  moveLeft() {
    if (this.location.x != 0) {
      this.location.x = this.location.x - 1;
      this.publishLocation();
    } else {
      console.log("out of bounds");
    }
  }

  moveRight() {
    if (this.location.x != 15) {
      this.location.x = this.location.x + 1;
      this.publishLocation();
    } else {
      console.log("out of bounds");
    }
  }

  publishLocation() {
    this.location$.next(Object.assign({}, this.location));
  }

}