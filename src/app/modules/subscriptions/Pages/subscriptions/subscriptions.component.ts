import { Component, HostListener } from '@angular/core';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SubscriptionService } from '../../../../data/services/subscription/subscription.service';
import { FormsModule } from '@angular/forms';
import { PageTemplateComponent } from "../../../../layouts/page-template/page-template.component";
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { CommonModule, DatePipe } from '@angular/common';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPopoverDirective, NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

registerLocaleData(localeFr);


@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [PageTemplateComponent, NzEmptyModule, TranslatePipe, NzDatePickerModule, FormsModule, NzPopoverDirective, NzButtonModule, NzTableModule, NzPopoverModule, CommonModule, NzPaginationModule, DatePipe, NzTagModule],
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css'],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' }, // Définit la locale en français
  ],
})
export class SubscriptionsComponent {
  subscriptions: any = [];
  clientData : any = [];
  currentPage: number = 1;
  total: number = 0;
  isLoading: boolean = true;
  SearchQuery: string = '';
  date: any;
  isOpenModalFilterDate: boolean = false;
  dateFormat: string = 'yyyy-MM-dd';
  FilterDates = { startDate: '', endDate: '' };
  isLoadingFilter: boolean = false;
  isMobileScreen = window.innerWidth <= 768; // Adjust the breakpoint as needed
  dateStart: any;
  dateEnd: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser') || '')?.user;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const target = event.target as Window;
    this.isMobileScreen = target.innerWidth <= 768;
  }


  constructor(
    private msg: NzMessageService,
    private _SubscriptionPlanService: SubscriptionService,
    private translate: TranslateService
  ) {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('fr');
    this.fetchSubscriptions();
  }

  subscriptionMutation = injectMutation(() => ({
    mutationKey: ['subscription', this.currentPage],
    onMutate: () => {
      this.isLoading = true;
    },
    mutationFn: () => this._SubscriptionPlanService.getAll({ page: this.currentPage, from: this.FilterDates.startDate, to: this.FilterDates.endDate, search: this.SearchQuery }),
    onSuccess: (data: any) => {
      this.subscriptions = data.data; // Assuming 'data.data' contains the subscription records
      this.clientData = data?.stripe_history;
      this.total = data.total; // Assuming 'data.total' gives the total number of subscriptions
      this.isLoading = false;
    },
    onError: (error: any) => {
      this.isLoading = false;

      this.msg.error('Échec du chargement des données de l\'abonnement. Veuillez réessayer.');
    }
  }));

  cancelSubscriptionMutation = injectMutation(() => ({
    mutationKey: ['cancel-subscription'],
    onMutate: () => {
      this.isLoading = true;
    },
    mutationFn: (subscriptionId: string) =>
      this._SubscriptionPlanService.cancel(subscriptionId, {}),
    onSuccess: () => {
      this.isLoading = false;
      this.msg.success('Abonnement annulé avec succès.');
      this.subscriptionMutation.mutate();
    },
    onError: (error: any) => {
      this.isLoading = false;
      this.msg.error('Échec de l\'annulation de l\'abonnement. Veuillez réessayer.');
    }
  }));

  CanncelPlan(item :any){
    //item.id
    this.cancelSubscriptionMutation.mutate(item.id);
  }

  fetchSubscriptions() {
    this.subscriptionMutation.mutate();
  }


  changePage(pageIndex: number): void {
    this.currentPage = pageIndex;
    this.fetchSubscriptions(); // Fetch subscriptions for the new page
  }

  openDraw(item: any): void {
    // Logic to open a modal or drawer with detailed information about the selected subscription
  }




  Onsearch($event: string) {
    this.SearchQuery = $event;
    this.subscriptionMutation.mutate()
  }

  // This function opens the date filter modal
  OpenModalFilterDate() {
    this.isOpenModalFilterDate = true;
  }

  // This function handles changes in the date range
  onChangeStartDate(date: any): void {
    if (date) {
      this.FilterDates.startDate = this.formatDate(date);
      this.validateDates(); // Optional: Validate dates after update
    }
  }

  onChangeEndDate(date: any): void {
    if (date) {
      this.FilterDates.endDate = this.formatDate(date);
      this.validateDates(); // Optional: Validate dates after update
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  validateDates(): void {
    if (this.FilterDates.startDate && this.FilterDates.endDate) {
      const startDate = new Date(this.FilterDates.startDate);
      const endDate = new Date(this.FilterDates.endDate);

      if (startDate > endDate) {
        // Optionally, you can reset the end date or show an error message to the user
        this.FilterDates.endDate = '';
      }
    }
  }


  // This function handles the closing of the modal without applying the filter
  handleCloseDateModalFilter() {
    this.isOpenModalFilterDate = false;
  }

  // This function applies the filter and closes the modal
  ComfirmModalFiltrageFilter() {
    this.subscriptionMutation.mutate();
    this.handleCloseDateModalFilter()
  }

}
