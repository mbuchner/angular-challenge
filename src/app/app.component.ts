import { Component, OnInit, HostListener } from '@angular/core';
import { GridService } from './services/grid.service';
import { RobotService } from './services/robot.service';
import { Location } from './model/location.model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  robotCell: string;

  gridData$: any;

  instructionSet: string[];

  instructionSet$: any;

  measures: string;

  play() {
    // So far so good!
    // Welcome to the mars robot challenge! We already have prepared
    // the services and data for you but this function is still missing.
    // It can be triggered by pressing the play button in the HTMLv view.
    // Based on the "instructionSet" ("RIGHT", "UP", "RIGHT", ...)
    // you should navigate the robot on mars and measure after every move.
    // The "robotService" provides you with the required functions.
    // (moveUp, moveDown, moveLeft, moveRight, measure)
    // Finally use the measuements and proceed to the next challenge ...

    console.log(this.instructionSet);

    this.robotService.measure();
    //...
  }

  constructor(
    private gridService: GridService,
    private robotService: RobotService
  ) {
    this.gridData$ = this.gridService.gridData$;
    this.instructionSet$ = this.gridService.instructionSet$;
  }

  ngOnInit() {
    this.robotService.location$.subscribe((location: Location) => {
      this.robotCell = location.x + 'x' + location.y;
    });
    this.robotService.measures$.subscribe((measures: any[]) => {
      this.measures = (measures && measures.join(' ')) || '\u00a0';
    });
    this.gridService.instructionSet$.subscribe((instructions: any[]) => {
      this.instructionSet = instructions;
    });
  }

  reset() {
    this.robotService.reset();
  }
}
