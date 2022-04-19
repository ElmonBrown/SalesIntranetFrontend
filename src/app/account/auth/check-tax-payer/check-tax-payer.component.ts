import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-check-tax-payer",
  templateUrl: "./check-tax-payer.component.html",
  styleUrls: ["./check-tax-payer.component.scss"],
})
export class CheckTaxPayerComponent implements OnInit {
  rncCtrl = new FormControl("", []);
  response: any;
  constructor(private authService: AuthService,private router: Router, ) {}

  ngOnInit(): void {}

  onlyNumberKey(event) {
    return event.charCode == 8 || event.charCode == 0
      ? null
      : event.charCode >= 48 && event.charCode <= 57;
  }

  emailCtrl = new FormControl("", [Validators.required]);

  submit() {
    this.authService.get(this.rncCtrl.value).subscribe(
      data => console.log('success', data),
      error =>  { if(error == 'Cliente no esta registrado'){
        this.router.navigate(["/register"]);
         }
        });
  }
}
