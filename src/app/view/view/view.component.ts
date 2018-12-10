import { Component, OnInit } from '@angular/core';
import { PlanogramService } from 'src/app/services/planogram.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(public planoService: PlanogramService) { }

  ngOnInit() {
  }

}
