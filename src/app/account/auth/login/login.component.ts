import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  miFormulario: FormGroup = this.fb.group({
    User: ['', [Validators.required]],
    Password: ['', [Validators.required, Validators.minLength(6)]],
  });

  subscription: Subscription;
  isLoading: boolean = false;
  showError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void { 
    if(this.authService.isLogged) {
      const isLogged = this.authService.isLogged();
      if(isLogged) {
        this.router.navigateByUrl('/pages/blank-page');
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  login() {
    const { User, Password } = this.miFormulario.value;

    this.isLoading = true
    this.showError = false
    this.subscription = this.authService.login(User, Password)
      .subscribe(resp => {
        if (resp.token) {
          this.isLoading = false
          this.router.navigateByUrl('/pages/blank-page');
        } else {
          this.isLoading = false
          this.showError = true
        }
      });
  }
}
