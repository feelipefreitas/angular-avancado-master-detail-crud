import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  @Input('pageTitle') pageTitle: string;
  @Input('buttonClass') buttonClass: string;
  @Input('buttonText') buttonText: string;
  @Input('buttonLink') buttonLink: string;

  constructor() { }

  ngOnInit() {
  }

}
