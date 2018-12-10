import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanogramService {
  private planogram: number = 10;
  public get planogramId() {
    return this.planogram;
  }
  constructor() {
    console.log('Instantiated');
  }
}
