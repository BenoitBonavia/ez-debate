import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterDTO} from "../../models/auth.models";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'ed-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  constructor(private authService: AuthService) {
  }

  registerDTO = new RegisterDTO();

  registerForm = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    firstNameFormControl: new FormControl('', [
      Validators.required
    ]),
    lastNameFormControl: new FormControl('', [
      Validators.required
    ]),
    passwordFormControl: new FormControl('', [
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9].{8,}')
    ]),
    confirmPasswordFormControl: new FormControl('', [
      Validators.required,
    ])
  }, passwordMatchValidator);

  subscribe() {
    this.authService.register(this.registerDTO).subscribe(
      () => {},
      () => {
        console.log("error");
    },
      () => {
        console.log("success");
      })
  }
}

function passwordMatchValidator(g: FormGroup) {
  return g.get('passwordFormControl').value === g.get('confirmPasswordFormControl').value ? null : {'mismatch': true};
}
