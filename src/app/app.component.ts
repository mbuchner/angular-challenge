import { Component } from '@angular/core';
import { GridService } from './services/grid.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  constructor(private gridService: GridService){}

}
