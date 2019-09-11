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

  gridData: any[];

  robotCell: string = "10x10";

  constructor(private gridService: GridService, private robotService: RobotService) { }

  ngOnInit() {
    this.gridService.gridData$.subscribe((grid: any[]) => {
      this.gridData = grid;
    });

    this.robotService.location$.subscribe((location: Location) => {
      this.robotCell = location.x + "x" + location.y;
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    // event.key === 'ArrowUp'
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
