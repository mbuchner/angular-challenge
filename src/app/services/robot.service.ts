import { Injectable } from '@angular/core';
import { GridService } from './grid.service';
import { Observable, BehaviorSubject, combineLatest, empty, forkJoin, of } from 'rxjs';
import { Location } from '../model/location.model';

@Injectable({ providedIn: 'root' })
export class RobotService {

  measures: any[];

  location = {} as Location;

  location$ = new BehaviorSubject<any>(this.location);

  constructor(private gridService: GridService) {
    this.location = { x:0, y:0 };
    this.location$.next(this.location);
  }

  measure(){
    // get value from gridservice
    //this.measures.push(gridService.getValue(this.location));
  }

  moveUp() {
    if (this.location.y != 0) {
      this.location.y = this.location.y - 1;
      this.location$.next(this.location);
    } else {
      console.log("out of bounds");
    }
  }

  moveDown() {
    if (this.location.y != 15) {
      this.location.y = this.location.y + 1;
       this.location$.next(this.location);
    } else {
      console.log("out of bounds");
    }
  }

  moveLeft() {
    if (this.location.x != 0) {
      this.location.x = this.location.x - 1;
       this.location$.next(this.location);
    } else {
      console.log("out of bounds");
    }
  }

  moveRight() {
    if (this.location.x != 15) {
      this.location.x = this.location.x + 1;
       this.location$.next(this.location);
    } else {
      console.log("out of bounds");
    }
  }
}