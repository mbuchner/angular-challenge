import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RobotService {

  position: Location;

  measures: any[];

  location = {
    x: 0,
    y: 0
  };

  constructor() {
    this.location.x = 1;
    this.location.y = 2;
  }

  measure(){
    // get value from gridservice
    //this.measures.push(gridService.getValue(this.location));
  }

  moveUp() {
    if (this.location.y != 0) {
      this.location.y = this.location.y - 1;
    } else {
      console.log("out of bounds");
    }
  }

  moveDown() {
    if (this.location.y != 15) {
      this.location.y = this.location.y + 1;
    } else {
      console.log("out of bounds");
    }
  }

  moveLeft() {
    if (this.location.x != 0) {
      this.location.x = this.location.x - 1;
    } else {
      console.log("out of bounds");
    }
  }

  moveRight() {
    if (this.location.x != 15) {
      this.location.x = this.location.x + 1;
    } else {
      console.log("out of bounds");
    }
  }
}