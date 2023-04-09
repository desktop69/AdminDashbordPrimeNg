import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryEventsService {
  private categoryAddedSource = new Subject<void>();
  categoryAdded$ = this.categoryAddedSource.asObservable();

  constructor() { }

  categoryAdded(): void {
    this.categoryAddedSource.next();
  }
}
