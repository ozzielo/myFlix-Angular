import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss']
})
export class SummaryCardComponent implements OnInit {
  /**
   *
   * @param data
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; description: string }
  ) { }

  ngOnInit(): void { }
}