import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { environment } from "../../../../environments/environment.development";
import {NgClass, NgIf} from "@angular/common";
import {injectMutation, injectQuery} from "@tanstack/angular-query-experimental";
import {PaymentService} from "../../../data/services/Payment/payment.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {AuthService} from "../../../data/services/auth/auth.service";
import { SubscriptionService } from '../../../data/services/subscription/subscription.service';



@Component({
  selector: 'app-payment',
  standalone: true,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  imports: [
    NgIf,
    NgClass
  ]
})
export class PaymentComponent implements OnInit  {
  @Input() SelectedPlan! : {
    id: number;
    name: string;
    price: string;
    features: string[];
  } ;
  stripe: Stripe | null = null;
  isFormPaymentLoaded = false;
  elements: StripeElements | null = null;
  isLoading: boolean = false;
  isLoadingC: boolean = true;

  clientSecret: any = '';
  private currentUser: any;
  private tempData = localStorage.getItem('tempData') ? JSON.parse(localStorage.getItem('tempData')!) : null;

  constructor(private _AuthService: AuthService , private _SubscriptionPlanService : SubscriptionService ,private _PaymentService : PaymentService , private message : NzMessageService , private router : Router) {
    const storedUser = localStorage.getItem('currentUser');

    if (!this.tempData) {
    if (storedUser) {
      try {
        const parsedData = JSON.parse(storedUser);
        this.currentUser = parsedData?.user || null;  // safely access the user property
      } catch (error) {
        this.currentUser = null;
      }
    }

    // If no user is found in localStorage, fall back to the AuthService
    if (!this.currentUser) {
      this._AuthService.currentUser.subscribe(
        (user: any) => {
          // Handle the case where the user is available from the AuthService
          this.currentUser = user;
        },
        (error) => {
          this.currentUser = null;
        }
      );
    }
  }else{
    this.currentUser = this.tempData;
  }
  }

  subscriptionMutaion = injectMutation((client) => ({
    mutationKey: ['subscription'],
    mutationFn: () => this._SubscriptionPlanService.create({}),
    onSuccess : (data : any) => {

    }
  }));

  SecretClientKeyMutation = injectMutation((client) => ({
    mutationKey: ['SecretClientKey'],
    mutationFn: () => this._PaymentService.createPaymentIntent(this.SelectedPlan.id , this.currentUser.token),
    onSettled : () => {
      this.isLoadingC = true
    },
    onSuccess: () => {

      this.isLoadingC = false
    },
    onError: (error) => {
      this.isLoadingC = false
    }
  }));

  async ngOnInit() {



    this.SecretClientKeyMutation.mutate(undefined, {
      onSettled : () => {
        this.isLoadingC = true
      },
      onSuccess: (data) => {
        this.clientSecret = data?.client_secret;
        this.isLoadingC = false
      },
      onError: (error) => {
        this.isLoadingC = false
      }
    });


    if (this.SecretClientKeyMutation.data()) {
      this.isLoadingC = false
    }
    this.stripe = await loadStripe(environment.Stripekey);
    if (this.stripe) {
      this.elements = this.stripe.elements({
        mode: "payment",
        payment_method_types: ['card' ],
        amount : Math.round(parseFloat(this.SelectedPlan.price)  * 100) ,//to check later
        currency: "eur",
        setup_future_usage: 'off_session',
      });

      const paymentElement = this.elements.create('payment');
      paymentElement.mount('#payment-element');
      this.isFormPaymentLoaded = true
    }
  }


  async submitPayment(event: Event) {
    event.preventDefault();

    if (!this.stripe || !this.elements) {
      return;
    }

    this.isLoading = true;
    const { error: submitError } = await this.elements.submit();
    if (submitError) {
      this.isLoading = false;
      this.message.create('error' , submitError.message  ||"Error submitting payment element" );

      return;
    }
    const currentDomain = window.location.origin;

    const returnUrl = `${currentDomain}/auth/signup/`;

    const { error } = await this.stripe.confirmPayment({
      elements: this.elements,
      clientSecret : this.clientSecret,
      confirmParams: {
        return_url: returnUrl,//frontend url
      },
    });

    this.isLoading = false;

    if (error) {
      this.message.create('error' , error.message || 'Something went wrong.' );

    } else {
      this.message.create('success' , "L'opération a été effectuée avec succès." );

      this.subscriptionMutaion.mutate();
    }
  }

}
