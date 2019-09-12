import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GridService } from './services/grid.service';
import { RobotService } from './services/robot.service';
import { ReplacePipe } from './replace.pipe';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule ],
  declarations: [ AppComponent, ReplacePipe ],
  bootstrap:    [ AppComponent ],
  providers: [ GridService, RobotService ],
})
export class AppModule { }
