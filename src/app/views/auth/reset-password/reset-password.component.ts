import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { getErrorMessage } from 'src/app/utils/getErrorMessage';
import { NotifyService } from 'src/app/services/notify.service';
import {
  validPassword,
  passwordMatchingValidatior,
} from 'src/app/utils/validate';
@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  @Output() onPasswordChanged = new EventEmitter<boolean>();
  sendConfirmationCodeForm = new FormGroup({
    emailOrUsername: new FormControl(null, [Validators.required]),
  });
  verifyConfirmationCodeForm = new FormGroup({
    code: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
    ]),
  });
  passwordResetForm = new FormGroup(
    {
      password: new FormControl(null, [
        Validators.required,
        this.passwordValidator,
      ]),
      confirmPassword: new FormControl(null, [Validators.required]),
    },
    {
      validators: passwordMatchingValidatior,
    }
  );
  activeStep: 'firstStep' | 'secondStep' | 'thirdStep' = 'firstStep';
  message: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  passwordState = {
    pw1: false,
    pw2: false,
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private notifyService: NotifyService
  ) {
    this.message = '';
    this.errorMessage = '';
  }
  passwordValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value) {
      const isValid = validPassword(control.value);

      if (!isValid) return { validFormat: !isValid };
    }
    return null;
  }
  ngOnInit(): void {
    this.sendConfirmationCodeForm.controls[
      'emailOrUsername'
    ].valueChanges.subscribe((val) => {
      this.errorMessage = '';
    });
    this.verifyConfirmationCodeForm.controls['code'].valueChanges.subscribe(
      (val) => {
        this.errorMessage = '';
      }
    );
  }
  onClickBackBtnToLoginScreen() {
    this.onPasswordChanged.emit(true);
  }
  onClickBackBtn() {
    this.activeStep = 'firstStep';
    this.verifyConfirmationCodeForm.controls['code'].setValue('');
  }
  onClickResend() {
    this.verifyConfirmationCodeForm.controls['code'].setValue('');
    this.onSubmitSendConfirmationCodeForm();
  }
  onSubmitSendConfirmationCodeForm() {
    if (!this.sendConfirmationCodeForm.valid) {
      return;
    }
    this.loading = true;
    let { emailOrUsername } = this.sendConfirmationCodeForm.value;
    emailOrUsername = emailOrUsername?.replace(/\s/g, '');

    this.authService
      .sendConfirmationCode(emailOrUsername)
      .then((response) => {
        this.activeStep = 'secondStep';
        this.message = response.result.message;
        this.errorMessage = '';
        this.notifyService.success(this.message, 'Success');
      })
      .catch((error) => {
        this.errorMessage = error.error.responseException.exceptionMessage;
        this.message = '';
      })
      .finally(() => {
        this.loading = false;
      });
  }
  onSubmitVerifyConfirmationCodeForm() {
    if (
      !(
        this.sendConfirmationCodeForm.valid &&
        this.verifyConfirmationCodeForm.valid
      )
    ) {
      return;
    }
    this.loading = true;
    let { code } = this.verifyConfirmationCodeForm.value;
    let { emailOrUsername } = this.sendConfirmationCodeForm.value;
    emailOrUsername = emailOrUsername?.replace(/\s/g, '');
    code = code?.replace(/\s/g, '');

    this.authService
      .verifyConfirmationCode(emailOrUsername, code)
      .then((response) => {
        this.activeStep = 'thirdStep';
        this.message = response.result.message;
        this.errorMessage = '';
      })
      .catch((error) => {
        this.errorMessage = error.error.responseException.exceptionMessage;
        this.message = '';
      })
      .finally(() => {
        this.loading = false;
      });
  }
  onSubmitPasswordResetForm() {
    if (
      !(
        this.verifyConfirmationCodeForm.valid &&
        this.sendConfirmationCodeForm.valid &&
        this.passwordResetForm.valid
      )
    ) {
      return;
    }
    this.loading = true;
    let { password, confirmPassword } = this.passwordResetForm.value;
    let { code } = this.verifyConfirmationCodeForm.value;
    let { emailOrUsername } = this.sendConfirmationCodeForm.value;

    emailOrUsername = emailOrUsername?.replace(/\s/g, '');
    password = password?.replace(/\s/g, '');
    code = code?.replace(/\s/g, '');

    if (!(password === confirmPassword)) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    this.authService
      .passwordReset(emailOrUsername, password, code)
      .then((response) => {
        this.message = response.result.message;
        this.errorMessage = '';
        this.notifyService.success('Password has been changed', 'Success');
        this.onPasswordChanged.emit(true);
      })
      .catch((error) => {
        this.errorMessage = error.error.responseException.exceptionMessage;
        this.message = '';
      })
      .finally(() => {
        this.loading = false;
      });
  }
  togglePasswordState(key: string) {
    this.passwordState[key] = !this.passwordState[key];
  }
}
