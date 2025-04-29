import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { AuthService } from '../../../../data/services/auth/auth.service';
import { firstValueFrom } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslatePipe, NzButtonModule, NzPopoverModule, RouterModule, NzNotificationModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  protected isLoginPopoverVisible: boolean = false;
  private _AuthService = inject(AuthService);
  private router = inject(Router);
  protected isLoggingIn: boolean = false;

  mutation = injectMutation((client) => ({
    mutationKey: ['Auth'],
    mutationFn: (formData: { email: string; password: string }) =>
      firstValueFrom(this._AuthService.login(
        formData.email,
        formData.password
      )),
    onMutate: () => {
      this.isLoggingIn = true;
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['Auth'] });
      this.message.create('', `👋 Bienvenue sur votre espace applicatif ! `);

      this.router.navigate(['/']);
    },
    onError: (error: any) => {
      const response = error?.error.message;
     console.log(error?.error?.abonnement_stripe);
      // Check if the response matches the specific message and translate it
      if (response === 'The selected email is invalid.') {
        const frenchMessage = 'L\'email sélectionné est invalide.';
        this.message.create('warning', frenchMessage);
      } else if (response === 'Invalid credentials') {
        const frenchMessage = 'Mot de passe incorrect.';
        this.message.create('warning', frenchMessage);
      } else {
        this.message.create('warning', response);
      }

      const regex = /Votre essai gratuit s'est terminé/;


      if (regex.test(error.error.message) || error.error.message == 'Vous devez vous abonner pour continuer') {
        localStorage.setItem("tempData", JSON.stringify(error.error));
        if(error?.error?.trialUsed){
          localStorage.setItem("freePlan", "false");
        }else {
          localStorage.setItem("freePlan", "true");
        }
        this.router.navigate(['/auth/signup'], { queryParams: { subscription: 2 } });
        // localStorage.setItem('currentUser', JSON.stringify(error.error.token));

      }
    },

    onSettled: () => {
      this.isLoggingIn = false;
    },
  }));

  constructor(private translate: TranslateService, private fb: FormBuilder, private route: ActivatedRoute, private message: NzMessageService, private notification: NzNotificationService
  ) {
    localStorage.removeItem('freePlan')
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('fr');
    this.route.queryParams.subscribe((params) => {
      if (params['msg']) {
        // this.notification.info(
        //   'Session Expirée',
        //   'Votre token a expiré. Veuillez vous reconnecter pour continuer.',
        //   { nzPlacement: "topRight" }
        // );
      }


    });
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.mutation.mutate(this.loginForm.value); // Call the mutation to log in
    }
  }

  toggleLoginPopover(visible: boolean): void {
    if (this.loginForm.invalid) {
      this.isLoginPopoverVisible = visible;
    }
  }
}
