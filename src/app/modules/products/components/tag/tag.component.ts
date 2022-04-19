import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Presentation } from '../../models/product-detail';


@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {


  @Input() presentationProperties: Presentation;
  @Input() selectedPresentation: Presentation;
  @Output() changeSelectedTag = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    
  }

}
