import {Component} from "@angular/core";
import {RegisterDTO} from "../../models/auth.models";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'ed-signup-form',
  templateUrl: 'signup-form.component.html'
})
export class SignupFormComponent {

  visiblePassword = false;
  visiblePasswordConfirmation = false;
  registerForm: FormGroup;

  firstName: FormControl;
  lastName: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  email: FormControl;

  signupDTO = new RegisterDTO();

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private matSnackBar: MatSnackBar, private router: Router) {
    this.firstName = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.confirmPassword = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);

    this.registerForm = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: this.password,
      confirmPassword: this.confirmPassword
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  canSignUp() {
    return this.firstName.invalid || this.lastName.invalid || this.email.invalid || this.password.invalid || this.confirmPassword.invalid;
  }

  signUp() {
     this.authenticationService.signUp(this.signupDTO).subscribe(response => {
       this.matSnackBar.open('Your account have been created', 'Ok', {duration: 4000}).onAction().subscribe();
       this.router.navigateByUrl("/login");
     });
  }
}
