import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanogramService {
  private planogram = 10;
  public get planogramId() {
    return this.planogram;
  }
  constructor() {
  }
}
