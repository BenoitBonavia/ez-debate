import {Component, OnInit} from "@angular/core";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'ed-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  firstNameFormControl = new FormControl('', [
    Validators.required
  ]);
  lastNameFormControl = new FormControl('', [
    Validators.required
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
  ]);
  confirmPasswordFormControl = new FormControl('', [
    Validators.required,
  ])
}
