import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegisterService } from "./register.service";

export interface RegionModel {
  code: string;
  description: string;
}

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: [],
})
export class RegisterComponent implements OnInit {
  frmRegister: FormGroup;

  RegionMeasure: RegionModel[];
  RegionEntity: RegionModel;
  RegionMeasureId;

  constructor(private registerService: RegisterService, private fb: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.registerService.get().subscribe(
      //Temp
      (response) => {
        this.RegionMeasure = response.body;
      }
    );
  }

  private buildForm() {
    this.frmRegister = this.fb.group({
      society: ["", [Validators.required]],
      name: ["", [Validators.required]],
      address: ["", [Validators.required]],
      alternativeAddress: ["", []],
      city: ["", [Validators.required]],
      region: ["", [Validators.required]],
      cedula: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required]],
    });
  }

  save(event: Event) {
    event.preventDefault();
    if (this.frmRegister.valid) {
      const value = this.frmRegister.value;

      this.registerService.create(value).subscribe(
        (response) => console.log(response))
    } else {
      this.frmRegister.markAllAsTouched();
    }
  }


}
