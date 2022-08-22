import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { getErrorMessage } from 'src/app/utils/getErrorMessage';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: any;
  submitted: boolean = false;
  isLoginError: boolean = false;
  isCodeError: boolean = false;
  loading: boolean = false;
  showPassword: boolean = false;
  isRequiredSmsConfirmation: boolean = false;
  message: string = '';
  myForm = new FormGroup({
    emailOrUsername: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });
  logoSuffix = '';
  activeScreen: 'login' | 'resetPassword' = 'login';
  codeFormControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(4),
  ]);
  get logoUrl() {
    return `/assets/img/logo.${this.logoSuffix}.png`;
  }
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private notifyService: NotifyService
  ) {}

  ngOnInit(): void {}
  onSubmit() {
    this.auth();
  }

  onClickBackBtn() {
    this.isLoginError = false;
    this.isCodeError = false;
    this.myForm.removeControl('code');
    this.isRequiredSmsConfirmation = false;
  }

  onClickResend() {
    this.myForm.removeControl('code');
    this.auth();
  }
  /** @internal */
  private auth() {
    this.submitted = true;
    let { emailOrUsername, password } = this.myForm.value;
    if (!this.myForm.valid) {
      return;
    }
    emailOrUsername = emailOrUsername?.replace(/\s/g, '');
    password = password?.replace(/\s/g, '');

    this.isLoginError = false;
    this.loading = true;
    this.authService
      .login(emailOrUsername, password)
      .then((response) => {
        console.log('response');
        this.router.navigate(['/game'], {
          // queryParams: {
          //   redirect_url:
          //     this.route.snapshot.queryParamMap.get('redirect_url'),
          // },
        });
      })
      .catch((error) => {
        var errorMessages = getErrorMessage(error.error);
        this.message = errorMessages[0].reason;
        setTimeout(() => {
          this.isLoginError = true;
        }, 100);
      })
      .finally(() => {
        this.loading = false;
      });
  }
  GetDemoGame(){
    this.router.navigate(['/demo-game'], {
      // queryParams: {
      //   redirect_url:
      //     this.route.snapshot.queryParamMap.get('redirect_url'),
      // },
    });
  }
}
