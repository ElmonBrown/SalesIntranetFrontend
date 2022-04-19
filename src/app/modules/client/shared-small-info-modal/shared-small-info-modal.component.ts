import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'shared-small-info-modal',
  templateUrl: './shared-small-info-modal.component.html',
  styleUrls: ['./shared-small-info-modal.component.scss']
})
export class SharedSmallInfoModalComponent implements OnInit {

  @Input() modalRef: BsModalRef

  constructor() { }

  ngOnInit(): void {
  }
}
