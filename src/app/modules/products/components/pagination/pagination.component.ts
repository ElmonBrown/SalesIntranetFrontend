import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() totalOfPages: number;
  @Input() currentPage: number;
  @Output() changePage = new EventEmitter();
  pages: number[] = Array<number>();
  
  constructor() { }

  ngOnInit(): void {
    this.pages = this.generatePages();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.pages = this.generatePages();
  }

  private generatePages(): number[] {
    let newPages = Array<number>();
    for(let i = 0; i < this.totalOfPages; i++) {
      newPages.push(i + 1);
    }
    return newPages;
  }
}
