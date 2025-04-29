import { Component, OnInit } from '@angular/core';
import { PageTemplateComponent } from "../../../../layouts/page-template/page-template.component";
import { CurrencyPipe, DatePipe, NgForOf, NgIf } from "@angular/common";
import { injectMutation } from "@tanstack/angular-query-experimental";
import { StatsService } from "../../../../data/services/stats/stats.service";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzModalComponent } from "ng-zorro-antd/modal";
import { NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent } from "ng-zorro-antd/form";
import { NzOptionComponent, NzSelectComponent } from "ng-zorro-antd/select";
import { PaymentService } from "../../../../data/services/Payment/payment.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { ClientsService } from "../../../../data/services/clients/clients.service";
import { InvoicesService } from '../../../../data/services/invoices/invoices.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ReplacePipe } from '../../../../shared/pipes/replace/replace.pipe';
import { LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { NzTagModule } from 'ng-zorro-antd/tag';

registerLocaleData(localeFr);

@Component({
  selector: 'app-payments',
  standalone: true,
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
  imports: [
    PageTemplateComponent,
    NgIf,
    NgForOf,
    CommonModule,
    NzTagModule,
    FormsModule,
    NzButtonComponent,
    NzInputModule,
    NzIconModule,
    NzModalComponent,
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzSelectComponent,
    NzOptionComponent,
    CurrencyPipe,
    ReplacePipe,
    DatePipe,
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit {


  isLoadingGetLastPaymentsStats: boolean = false;
  FilterDates: { startDate: string, endDate: string } = { startDate: '', endDate: '' }
  lastPaymentsData: any;
  AddPaymentForm: FormGroup;
  isOpenModalAddPaymentForm: boolean = false;
  invoicesData: any;
  isLoadingGetInvoicesStats: boolean = false;
  isAddingPayment: boolean = false;
  isLoadingGetUnpaidInvoicesStats: boolean = false;
  UnpaidInvoicesStats: any;

  constructor(private _StatsService: StatsService, private _InvoicesService: InvoicesService, private _ClientService: ClientsService, private message: NzMessageService, private fb: FormBuilder, private _Payments: PaymentService) {
    this.AddPaymentForm = this.fb.group({
      invoice_id: ['', Validators.required],
      client_id: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]]
    });
  }

  // GetInvoicesStatsMutation
  GetInvoicesMutation = injectMutation((client: any) => ({
    mutationFn: () => this._InvoicesService.getAll({ all: true, client_id: this.AddPaymentForm.value.client_id, from: this.FilterDates.startDate, to: this.FilterDates.endDate }),
    onMutate: () => {
      this.isLoadingGetInvoicesStats = true;
    },
    onSuccess: (data: any) => {
      this.isLoadingGetInvoicesStats = false;
      this.invoicesData = data;
      client.invalidateQueries({ queryKey: ['calendarStats'] });
    },
    onError: (error: any) => {
      this.isLoadingGetInvoicesStats = false;
    },
  }));

  //stats
  GetLastPaymentsStatsMutation = injectMutation((client: any) => ({
    mutationFn: () => this._StatsService.GetLastPaymentsStats({ from: this.FilterDates.startDate, to: this.FilterDates.endDate }),
    onMutate: () => {
      this.isLoadingGetLastPaymentsStats = true;
    },
    onSuccess: (data: any) => {
      this.isLoadingGetLastPaymentsStats = false;
      this.lastPaymentsData = data;
      client.invalidateQueries({ queryKey: ['calendarStats'] });
    },
    onError: (error: any) => {
      this.isLoadingGetLastPaymentsStats = false;
    },
  }));
  GetUnpaidInvoicesStatsMutation = injectMutation((client: any) => ({
    mutationFn: () => this._StatsService.GetLastUnpaidClientsStats({ from: this.FilterDates.startDate, to: this.FilterDates.endDate }),
    onMutate: () => {
      this.isLoadingGetUnpaidInvoicesStats = true;
    },
    onSuccess: (data: any) => {
      this.isLoadingGetUnpaidInvoicesStats = false;
      this.UnpaidInvoicesStats = data;
      client.invalidateQueries({ queryKey: ['calendarStats'] });
    },
    onError: (error: any) => {
      this.isLoadingGetUnpaidInvoicesStats = false;
    },
  }));



  GetClientMutation = injectMutation<any>(() => ({
    mutationKey: ['clients', 'all'],
    mutationFn: () => this._ClientService.getAll({ all: true }),
    staleTime: 60000,
    cacheTime: 60000,
  }));


  addPaymentMutation = injectMutation(() => ({
    mutationFn: (data: any) => this._Payments.createPaymentInvoices(data),
    onSuccess: (data: any) => {
      this.isAddingPayment = false;
      this.message.success("Le paiement a été ajouté avec succès !"); // Cas de succès
      this.GetLastPaymentsStatsMutation.mutate();
      this.GetUnpaidInvoicesStatsMutation.mutate();
      this.handleCancelAdd();
    },
    onError: (error: any) => {
      this.isAddingPayment = false;
      this.message.error("Échec de l'ajout du paiement : " + error.message); // Cas d'erreur
    },
    onSettled: () => {
      // Cela s'exécute que la mutation réussisse ou échoue
      this.isAddingPayment = false;
    }
  }));



  ngOnInit() {
    this.GetLastPaymentsStatsMutation.mutate();
    this.GetUnpaidInvoicesStatsMutation.mutate();
    this.GetClientMutation.mutate();
  }

  openAddModal() {
    this.AddPaymentForm.reset();
    this.isOpenModalAddPaymentForm = true;
  }

  handleCancelAdd() {
    this.isOpenModalAddPaymentForm = false;
    this.AddPaymentForm.reset();
  }

  onComfirmAddingPayments() {
    if (this.AddPaymentForm.invalid) {
      this.message.warning("Tous les champs sont obligatoires")
      return; // Prevent submission if the form is invalid
    }
    if (this.AddPaymentForm.get('amount')?.value === 0 && this.AddPaymentForm.get('amount')?.value >= 0) {
      this.message.warning("Montant doit être supérieur à 0");
      return; // Prevent submission if the form is invalid

    }


    // Proceed with submission if the form is valid
    this.addPaymentMutation.mutate(this.AddPaymentForm.value);
  }


  getInitials(name: string): string {
    const parts = name.split(' ');
    return parts.map(part => part.charAt(0).toUpperCase()).join('');
  }

  getTotalAmountUnpaidInvoices() {
    return this.UnpaidInvoicesStats?.reduce((sum: any, item: any) => sum + item.unpaid_amount, 0);
  }

  getTotalPaymentsClients() {
    return this.lastPaymentsData?.reduce((sum: any, item: any) => sum + item.amount, 0);
  }

  OnSelectClientId() {
    this.GetInvoicesMutation.mutate();

  }
}
