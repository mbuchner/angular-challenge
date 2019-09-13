import { Component, OnInit, HostListener } from '@angular/core';
import { GridService } from './services/grid.service';
import { RobotService } from './services/robot.service';
import { Location } from './model/location.model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  robotCell: string;

  gridData$ = this.gridService.gridData$;

  instructionSet$ = this.gridService.instructionSet$;

  measures: string;

  play() {
    this.robotService.cleanup();
    // Hi Challenger!
    // Welcome to the mars robot challenge! We already have prepared  
    // the services and data for you but this function is still missing. 
    // It can be triggered by pressing the play button in HTML.
    // Based on the "instructionSet" you should navigate the robot 
    // on the mars and measure after every move.
    // The "robotService" provides you with the required funtions.
    // (moveUp, moveDown, moveLeft, moveRight, measure)
    this.robotService.moveDown();
    this.robotService.measure();
    this.robotService.moveLeft();
    this.robotService.measure();
    this.robotService.moveUp();
    this.robotService.measure();
    this.robotService.moveRight();
    this.robotService.measure();
    this.robotService.moveRight();
    this.robotService.measure();
    this.robotService.moveRight();
    this.robotService.measure();

  }

  constructor(private gridService: GridService, private robotService: RobotService) { }

  ngOnInit() {
    this.robotService.location$.subscribe((location: Location) => {
      this.robotCell = location.x + "x" + location.y;
    });
    this.robotService.measures$.subscribe((measures: any[]) => {
      this.measures = measures && measures.join(' ') || '\u00a0';
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      this.robotService.moveUp();
    } else if (event.key === 'ArrowDown') {
      this.robotService.moveDown();
    } else if (event.key === 'ArrowRight') {
      this.robotService.moveRight();
    } else if (event.key === 'ArrowLeft') {
      this.robotService.moveLeft();
    }
  }

}
