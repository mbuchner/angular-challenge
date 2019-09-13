import { Injectable } from '@angular/core';
import { GridService } from './grid.service';
import { Observable, BehaviorSubject, Subject, combineLatest, empty, forkJoin, of, merge } from 'rxjs';
import { scan, filter, startWith, map, shareReplay, switchMap, first, take, delay, concatAll, tap, withLatestFrom } from 'rxjs/operators';
import { Location } from './../model/location.model';

const wait = (timeout: number) => new Promise<void>(res => setTimeout(res, timeout));

type Move = {
  x: number;
  y: number;
}

@Injectable({ providedIn: 'root' })
export class RobotService {

  private doMove$ = new Subject<Move>();

  private doMeasure$ = new Subject<void>();

  private reset$ = new BehaviorSubject(null);

  private actions$ = merge(this.doMove$, this.doMeasure$).pipe(
    map(what => of(what).pipe(delay(300))),
    concatAll(),
  );

  location$ = this.reset$.pipe(
    switchMap(() => this.actions$.pipe(
      filter(action => !!action),
      startWith({ x: 10, y: 3 } as Move),
      scan<Move, Location>((location, move) => {
        const newLocation = { x: location.x + move.x, y: location.y + move.y };
        if (newLocation.x < 0 || newLocation.x > 15 || newLocation.y < 0 || newLocation.y > 15) return location;
        return newLocation;
      }, { x: 0, y: 0 } as Location),
      shareReplay({bufferSize: 1, refCount: true}),
    )));

  measures$ = this.reset$.pipe(
    switchMap(() => this.actions$.pipe(
      filter(action => !action),
      withLatestFrom(this.location$, (_, location) => location),
      scan((measures, location) => {
        return [...measures, this.gridService.readGridValue(location)];
      }, [] as string[]),
      startWith([] as string[]),
    )));

  constructor(private gridService: GridService) {
  }

  reset() {
    this.reset$.next(null);
  }

  async measure() {
    this.doMeasure$.next(undefined);
  }

  moveUp() {
    this.doMove$.next({ x: 0, y: -1 });
  }

  moveDown() {
    this.doMove$.next({ x: 0, y: 1 });
  }

  moveLeft() {
    this.doMove$.next({ x: -1, y: 0 });
  }

  moveRight() {
    this.doMove$.next({ x: 1, y: 0 });
  }
}