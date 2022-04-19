import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransferRejectdService } from './transfer-rejectd.service';

@Component({
  selector: 'app-transfer-rejectd',
  templateUrl: './transfer-rejectd.component.html',
  styleUrls: ['./transfer-rejectd.component.scss']
})
export class TransferRejectdComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private rejectdService: TransferRejectdService) {
    this.buildForm();
  }

  ngOnInit() {
  }

  private buildForm() {
    this.form = this.fb.group({
      reason: ['', [Validators.required, Validators.maxLength(200)]]
    });

    this.form.valueChanges
    .subscribe(value => {
      console.log(value);
    });
  }


  save(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    this.rejectdService.create(value).subscribe(
      resp => console.log(resp)
    );
  }



}
