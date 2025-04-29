import { CommonModule } from '@angular/common';
import { Component, inject, signal, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { AuthService } from '../../../../data/services/auth/auth.service';
import { firstValueFrom } from 'rxjs';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { PlanService } from "../../../../data/services/plan/plan.service";
import { NzEmptyComponent } from "ng-zorro-antd/empty";

import { PaymentComponent } from "../../../../shared/component/payment/payment.component";
import { SubscriptionService } from '../../../../data/services/subscription/subscription.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
//countries for test

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NzSelectModule, CommonModule, TranslatePipe, FormsModule, ReactiveFormsModule, RouterModule, NzPopoverModule, ReactiveFormsModule, PaymentComponent],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  protected selectedPlan: any = null;
  isPopoverVisible: boolean = false;
  isSubmittingChosedPlan: boolean = false;
  protected step: number = 1;
  registrationForm!: FormGroup;
  paymentForm: FormGroup;
  PaymentProcessLoading: boolean = false;
  private _AuthService = inject(AuthService);
  private _PlanService = inject(PlanService);
  private message = inject(NzMessageService);
  protected isRegistering: boolean = false;
  protected readonly Object = Object;


  isLoading = signal(false);
  freeTrialData = signal<any>(null);

  getFreeTrialMutation = injectMutation<any, void>(() => ({
    mutationKey: ['free-trial'],
    mutationFn: () => this._PlanService.getFreeTrial(),
    onMutate: () => {
      this.isLoading.set(true);
    },
    onSuccess: (data: any) => {
      this.isLoading.set(false);
      this.freeTrialData.set(data);
    },
    onError: () => {
      this.isLoading.set(false);
    },
    onSettled: () => {
      this.isLoading.set(false);
    },
  }));

  // Mutation for POST request
  startFreeTrialMutation = injectMutation(() => ({
    mutationKey: ['start-free-trial'],
    mutationFn: (data: any) => this._PlanService.startFreeTrial(data, this.tempDataUser.token),
    onMutate: () => {
      this.isLoading.set(true);
    },
    onSuccess: (data: any) => {
      this.isLoading.set(false);
      this.freeTrialData.set(data);
      this.router.navigate(['/']);
      this.message.success("Vous avez 45 jours gratuits.");
      localStorage.setItem('freePlan' , 'false')

    },
    onError: () => {
      this.isLoading.set(false);
    },
    onSettled: () => {
      this.isLoading.set(false);
    },
  }));





  mutation = injectMutation((client) => ({
    mutationKey: ['Auth', 'Signup'],
    mutationFn: (formData: any) =>
      firstValueFrom(this._AuthService.signup(formData)), // Adjust based on your service method
    onMutate: () => {
      this.isRegistering = true;
    },
    onSuccess: (res : any) => {
      this.message.create('success', `Enregistrement réussi ! , Sélectionnez votre plan`);

      localStorage.setItem("freePlan", "false");
      localStorage.setItem("tempData", JSON.stringify(res));
      this.router.navigate(['/auth/signup'], { queryParams: { subscription: 2 } });
      console.log(res)
    },
    onError: (error: any) => {
      if (error.error.message == 'The email has already been taken.') {
        this.message.create('error', 'Email déjà pris');
      } else {
        this.message.create('error', error.error.message);
      }
    },
    onSettled: () => {
      this.isRegistering = false;
    },
  }));

  // Define the query using injectQuery
  PlansQuery = injectQuery((client) => ({
    queryKey: ['plans'],
    queryFn: () => this._PlanService.getAll({}),
  }));
  countries: any;
  private tempDataUser: any;
  private router = inject(Router);
  freePlan: any = true;
  subscriptionMutaion = injectMutation((client) => ({
    mutationKey: ['subscription'],
    mutationFn: () => this._SubscriptionPlanService.create({}),
    onSuccess: (data: any) => {
    }
  }));
  constructor(private translate: TranslateService, private fb: FormBuilder, private route: ActivatedRoute, private _SubscriptionPlanService: SubscriptionService) {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('fr');


    this.freePlan = JSON.parse(localStorage.getItem("freePlan") || 'true');

    this.route.queryParams.subscribe((params) => {
      const paymentIntent = params['payment_intent'];
      const paymentIntentClientSecret = params['payment_intent_client_secret'];
      const redirectStatus = params['redirect_status'];
      const stepInchoicePlan = params['subscription'];

      // Check if `redirect_status` is "succeeded"
      if (redirectStatus === 'succeeded') {
        console.log('Payment Intent:', paymentIntent);
        console.log('Payment Intent Client Secret:', paymentIntentClientSecret);
        console.log('Redirect Status:', redirectStatus);
        // this.subscriptionMutaion.mutate();
        this.step = 4;

      }
      // Retrieve the data from localStorage
      if (stepInchoicePlan == 2) {
        this.step = 2;
      }
    });



    this.registrationForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      country: ['France'],
      phone: ['', [Validators.pattern(/^\d{10}$/)]],
      job: [''],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8), // Ensure a minimum of 8 characters
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ), // Pattern for strong password
        ],
      ],
    });

    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expirationDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvc: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      country: [''],
      city: ['', Validators.required],
      sp: ['', Validators.required],
      codePostal: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
    });


  }





  get f() {
    return this.paymentForm.controls;
  }

  ChosePlan(Plan: number | string) {
    this.isSubmittingChosedPlan = true;
    if (Plan == "FREE" && this.freePlan == true) {
      this.selectedPlan = "Gratuit";
      if (localStorage.getItem("tempData")) {
        this.tempDataUser = JSON.parse(localStorage.getItem("tempData")!);
      }

      if (this.tempDataUser?.user) {
        this.startFreeTrialMutation.mutate(this.tempDataUser.user);
      }
    } else {
      this.PlansQuery.data()?.map((item: any) => {
        if (item.id == Plan) {
          this.selectedPlan = item
        }
      });
      this.isSubmittingChosedPlan = true;
      setTimeout(() => {
        if (this.selectedPlan != null) {
          this.step++;
          this.message.create('success', `Vous avez choisi le plan :` + this.selectedPlan?.name);
          this.isSubmittingChosedPlan = false;
        } else {
          this.message.create('warning', `Vous avez pas choisi le plan , Réssayer`);
        }
      }, 1500)
    }

  }


  togglePopover(visible: boolean): void {
    if (this.registrationForm.invalid) {
      this.isPopoverVisible = visible;
    }
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.mutation.mutate(this.registrationForm.value); // Call the mutation to register
    } else {
    }
  }


}
