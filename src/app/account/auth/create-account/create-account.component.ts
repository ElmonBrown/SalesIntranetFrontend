import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder, ValidationErrors, ValidatorFn, AbstractControl } from "@angular/forms";
import { CustomValidators } from "../utils/custom-validators";

@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.component.html",
  styleUrls: ["./create-account.component.scss"],
})
export class CreateAccountComponent implements OnInit {
  frmSignup: FormGroup;
  invalidPassword: boolean = false

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {}

  private buildForm() {
    this.frmSignup = this.fb.group({
      userCtrl :['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      password: [null, [Validators.compose([
         // 1. Password Field is Required
         Validators.required,
         // 2. check whether the entered password has a number
         CustomValidators.patternValidator(/\d/, { hasNumber: true }),
          // 3. check whether the entered password has upper case letter
          CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
           // 4. check whether the entered password has a lower-case letter
         CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
         // 5. check whether the entered password has a special character
      //   CustomValidators.patternValidator(/[ [!@#$%^&*()_+-=[]{};':"|,.<>/?]/](<mailto:!@#$%^&*()_+-=[]{};':"|,.<>/?]/>), { hasSpecialCharacters: true }),
       // 6. Has a minimum length of 8 characters
       Validators.minLength(8)]) 
    ],
    ],
    confirmPassword: [null, Validators.compose([Validators.required])]
    },
    {
      // check whether our password and confirm password match
      validator: CustomValidators.passwordMatchValidator
   });

  }

  get userField(){
    return this.frmSignup.get('userCtrl')
  }

  get userValid(){
    return this.userField.touched && this.userField.valid;
  }
  get userInvalid(){
    return this.userField.touched && this.userField.invalid;
  }

  //password1
  get passwordField(){
    return this.frmSignup.get('password')
  }

  get passwordFieldValid(){
    return this.passwordField.touched && this.passwordField.valid;
  }
  get passwordFieldInvalid(){
    return this.passwordField.touched && this.passwordField.invalid;
  }

    //password2
    get confirmPasswordField(){
      return this.frmSignup.get('confirmPassword')
    }
  
    get password2FieldValid(){
      return this.confirmPasswordField.touched && this.confirmPasswordField.valid;
    }
    get confirmPasswordFieldInvalid(){
      return this.confirmPasswordField.touched && this.confirmPasswordField.invalid;
    }

  save(event: Event) {
    event.preventDefault();
    if (this.frmSignup.valid) {
      const value = this.frmSignup.value;
      console.log(value);
    } else {
      this.frmSignup.markAllAsTouched();
    }
  }
}
