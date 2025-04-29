import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgOtpInputModule } from 'ng-otp-input';
import { AuthService } from "../../../../../data/services/auth/auth.service";
import { injectMutation } from '@tanstack/angular-query-experimental';
import { QueryClient } from '@tanstack/query-core';
import { firstValueFrom } from 'rxjs';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router, RouterLink} from "@angular/router";
import {NzPopoverDirective} from "ng-zorro-antd/popover";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reset-pwd',
  standalone: true,
  imports: [CommonModule , TranslatePipe, NgOtpInputModule, ReactiveFormsModule, RouterLink, NzPopoverDirective],
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.css']
})
export class ResetPwdComponent {
  protected isCheckingOTP: boolean = false;
  protected isSubmitting: boolean = false;
  protected step: number = 1;
  protected otpValue: string = '';
  protected password: string = '';
  protected confirmPassword: string = '';
  protected errorMessage: string | null = null;
  protected countdown: number = 30;
  protected form : FormGroup;
  isAbletoResend: boolean = false;
  protected PasswordForm : FormGroup;
  protected token :any;

  constructor( private translate : TranslateService,private _AuthService: AuthService , private fb :FormBuilder , private message : NzMessageService  , private router: Router) {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('fr');

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email ,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)      ]],
    })

    this.PasswordForm = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) // At least 8 characters, one letter and one number
      ]],
      password_Repeated: ['', [
        Validators.required
      ]]
    }, { validators: this.passwordsMatch });


    this.startCountdown()//for testing
  }

  passwordsMatch(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const passwordRepeated = formGroup.get('password_Repeated')?.value;
    return password && passwordRepeated && password === passwordRepeated ? null : { notMatching: true };
  }

  // Request OTP mutation
  requestOtpMutation = injectMutation((client) => ({
    mutationKey: ['Auth', 'RequestOtp'],
    mutationFn: (Email: string) =>
      firstValueFrom(this._AuthService.demandeOtpNumber(Email)),
    onMutate: () => {
      this.isSubmitting = true;
      this.errorMessage = null;
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['Auth', 'RequestOtp'] });
      this.step = 2;
      this.startCountdown()
      this.message.create('success' , 'Le code de vérification a été envoyé sur votre boîte e-mail')

    },
    onError: (error: any) => {
      this.errorMessage = error?.error?.message || 'Failed to request OTP. Please try again.';
      this.message.create('warning' , error?.error?.message)
    },
    onSettled: () => {
      this.isSubmitting = false;
    },
  }));

  // Verify OTP mutation
  verifyOtpMutation = injectMutation((client) => ({
    mutationKey: ['Auth', 'VerifyOtp'],
    mutationFn: (otp: number) => firstValueFrom(this._AuthService.VerifyOtp(otp)),
    onMutate: () => {
      this.isCheckingOTP = true;
      this.errorMessage = null;
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['Auth', 'VerifyOtp'] });
      this.step = 3; // Proceed to password change step
    },
    onError: (error: any) => {
      this.errorMessage = error?.error?.message || 'Failed to verify OTP. Please try again.';
    },
    onSettled: () => {
      this.isCheckingOTP = false;
    },
  }));

  // Change password mutation
  changePasswordMutation = injectMutation((client) => ({
    mutationKey: ['Auth', 'ChangePassword'],
    mutationFn:(data: { password: string; token: string }) =>
      firstValueFrom(this._AuthService.ChangePassword(data)),
    onMutate: () => {
      this.isSubmitting = true;
      this.errorMessage = null;
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['Auth', 'ChangePassword'] });
        this.router.navigate(['/auth/login']);
        const id = this.message.loading('Action in progress..', { nzDuration: 0 }).messageId;
        setTimeout(() => {
          this.message.remove(id);
          this.message.create('success' , 'Password changed successfully.');
        }, 2500);
    },
    onError: (error: any) => {
      this.errorMessage = error?.error?.message || 'Failed to change password. Please try again.';
      this.message.create('error' , error?.error?.message);



    },
    onSettled: () => {
      this.isSubmitting = false;
    },
  }));

  // Request OTP handler
  RequestOtpHannlder(): void {
    this.requestOtpMutation.mutate(this.form.value.email);
  }

  // OTP input change handler
  onOtpChange($event: string): void {
    this.token = $event;
    if (this.token.length === 8) {
      this.verifyOtpMutation.mutate(Number(this.token));
    }
  }

  // Change password handler
  onChangePassword(): void {

    const password = this.PasswordForm.get('password')?.value;
    const passwordRepeated = this.PasswordForm.get('password_Repeated')?.value;

    if (password && passwordRepeated && password === passwordRepeated) {
      this.changePasswordMutation.mutate({ password, token: this.token });
    } else {
      this.errorMessage = 'Passwords do not match!';
      this.message.create("warning", this.errorMessage);
    }
  }


  DemandeNewOtpNumber() {
    this.countdown = 30;
    this.isAbletoResend = false;

    this.RequestOtpHannlder();
    this.startCountdown();
  }

  startCountdown() {
    const interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(interval);
        this.isAbletoResend = true
      }
    }, 1000);
  }
}
