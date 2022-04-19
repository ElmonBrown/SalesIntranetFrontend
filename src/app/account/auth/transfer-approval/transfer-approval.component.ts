import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transfer-approval',
  templateUrl: './transfer-approval.component.html',
  styleUrls: ['./transfer-approval.component.scss']
})
export class TransferApprovalComponent implements OnInit {

  CodeSAP: string
  constructor(private activatedRoute : ActivatedRoute) { 

    this.activatedRoute.params.subscribe( params => {
      this.CodeSAP = params['id']
      console.log(this.CodeSAP);
    })
  }

  ngOnInit(): void {
  }

}
