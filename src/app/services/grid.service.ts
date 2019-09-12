import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, combineLatest, empty, forkJoin, of } from 'rxjs';
import { catchError, map, mapTo, startWith, switchMap, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GridService {

  gridData: any[];

  instructionSet: any[];

  gridData$ = new BehaviorSubject<any[]>(this.gridData);

  instructionSet$ = new BehaviorSubject<any[]>(this.instructionSet);

  constructor(private http: HttpClient) {
    this.fetchGridData();
  }

  fetchGridData(): Promise<any> {
    return this.http.get<any[]>("./assets/grid.json")
      .toPromise()
      .then((gridData: any[]) => {
        this.gridData$.next(gridData);
        console.log('Grid data fetched: ', gridData);
      })
      .catch((err) => console.log(err));
  }

    fetchInstructionSet(): Promise<any> {
    return this.http.get<any[]>("./assets/instructionSet.json")
      .toPromise()
      .then((instructionSet: any[]) => {
        this.instructionSet$.next(instructionSet);
        console.log('IinstructionSet fetched: ', instructionSet);
      })
      .catch((err) => console.log(err));
  }


}