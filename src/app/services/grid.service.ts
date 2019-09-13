import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, combineLatest, empty, forkJoin, of } from 'rxjs';
import { catchError, map, mapTo, startWith, switchMap, tap } from 'rxjs/operators';
import { Location } from './../model/location.model';

@Injectable({ providedIn: 'root' })
export class GridService {

  gridData$ = new BehaviorSubject<any[]>(undefined);

  instructionSet$ = new BehaviorSubject<any[]>(undefined);

  constructor(private http: HttpClient) {
    this.fetchGridData();
    this.fetchInstructionSet();
  }

  fetchGridData(): Promise<any> {
    return this.http.get<any[]>("./assets/grid.json")
      .toPromise()
      .then((gridData: any[]) => {
        this.gridData$.next(gridData);
        console.log('Grid data fetched!');
      })
      .catch((err) => console.log(err));
  }

  fetchInstructionSet(): Promise<any> {
    return this.http.get<any[]>("./assets/instructionSet.json")
      .toPromise()
      .then((instructionSet: any[]) => {
        this.instructionSet$.next(instructionSet);
        console.log('InstructionSet fetched!');
      })
      .catch((err) => console.log(err));
  }

  readGridValue(location: Location): string {
    const row: any[] = this.gridData$.value[location.y];
    return row[location.x].charCodeAt(0).toString(2);
  }

}