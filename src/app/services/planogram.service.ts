import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanogramService {
  private planogramId: number = 10;
  constructor() {
    console.log('Instantiated');
  }
}
