import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, combineLatest, empty, forkJoin, of } from 'rxjs';
import { catchError, map, mapTo, startWith, switchMap, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GridService {

  gridData: any[];

  gridData$ = new BehaviorSubject<any[]>(this.gridData);

  constructor(private http: HttpClient) {
    this.fetchGridData();
  }

  public getJSON(): Observable<any[]> {
    return this.http.get<any[]>("./assets/grid.json");
  }

  fetchGridData(): Promise<any> {
    return this.getJSON()
      .toPromise()
      .then((gridData: any[]) => {
        this.gridData$.next(gridData);
        console.log('Data have been fetched from the API', gridData);
      })
      .catch((err) => console.log(err));
  }


}