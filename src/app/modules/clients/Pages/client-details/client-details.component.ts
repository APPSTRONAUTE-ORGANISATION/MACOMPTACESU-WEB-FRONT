import { Component, OnInit } from '@angular/core';
import { PageTemplateComponent } from "../../../../layouts/page-template/page-template.component";
import { ActivatedRoute } from "@angular/router";
import { injectMutation, injectQuery } from "@tanstack/angular-query-experimental";
import { ClientsService } from "../../../../data/services/clients/clients.service";
import { CommonModule, DatePipe, NgForOf, NgIf } from "@angular/common";
import { NzTagComponent, NzTagModule } from "ng-zorro-antd/tag";
import { NzPaginationComponent } from "ng-zorro-antd/pagination";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InvoicesService } from "../../../../data/services/invoices/invoices.service";
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [
    PageTemplateComponent,
    DatePipe,
    NgIf,
    NzTagComponent,
    NzPaginationComponent,
    NgForOf,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    NzPopoverModule,
    NzDatePickerModule,
    NzSelectModule,
    NzTagModule,
    NzSelectModule,
    NzPopoverModule,
    TranslatePipe
  ],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css'
})
export class ClientDetailsComponent implements OnInit {

  protected clientId: any = null;
  protected currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  protected currentPage: number = 1;
  protected SearchQuery: string = '';
  isLoading: boolean = true;
  invoicesData: any;
  isPopoverVisible: boolean = false;
  startDate: any;
  endDate: any;

  constructor(private translate: TranslateService, private _ClientService: ClientsService, private _InvoicesService: InvoicesService, private route: ActivatedRoute) {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('fr');

    this.clientId = Number(this.route.snapshot.params['id']);
    this.GetInvoicesMutation.mutate();
  }

  GetClientDetailsQuery = injectQuery<any>(() => ({
    queryKey: ['clients', 'details', this.clientId],
    queryFn: () => this._ClientService.getById(this.clientId),
  }));

  change(visible: boolean): void {
    this.isPopoverVisible = visible;  // Handles the visibility change
  }


  statuses = ['Payé', 'En retard'];

  // Selected Filters
  selectedStatus: string | null = null;
  // dateRange: any= this.getLastMonthDateRange();
  dateRange: any = null;
  // Apply Filter
  applyFilter(type: string, value: any): void {
    if (type === 'status') {
      this.selectedStatus = value;
    } else if (type === 'dateRange') {
      this.dateRange = value;
    }
  }

  Search() {
    this.dateRange = [this.startDate, this.endDate]
    this.dateRange = this.dateRange?.map((date: any) => {
      // Check if the value is a Date object
      if (date instanceof Date) {
        return date.toISOString().slice(0, 10); // Format the date as YYYY-MM-DD
      }
      return date; // If it's not a Date object, keep it as is
    });
    this.GetInvoicesMutation.mutate()
  }
  Searchempty() {
    this.dateRange = []
    this.startDate = this.endDate = null
    this.selectedStatus = ''
    this.GetInvoicesMutation.mutate()

  }

  // Clear Filter
  clearFilter(type: string): void {
    if (type === 'status') {
      this.selectedStatus = null;
    } else if (type === 'dateRange') {
      this.dateRange = null;
    }
  }



  GetInvoicesMutation = injectMutation<any>(() => ({
    mutationKey: ['clients', 'details', 'invoice', this.clientId],
    mutationFn: () => {
      this.isLoading = true;  // Start loading when mutation is triggered
      return this._InvoicesService.getAll({
        page: this.currentPage,
        search: this.SearchQuery,
        client_id: this.clientId,
        from: this.dateRange[0],
        to: this.dateRange[1],
        status: this.selectedStatus
      });
    },
    onSuccess: (data) => {
      this.invoicesData = data
      this.isLoading = false;  // Stop loading once the mutation is successful
    },
    onError: (error) => {
      this.isLoading = false;  // Stop loading in case of an error
    }
  }));

  changePage($event: number) {
    this.currentPage = $event;
    this.GetInvoicesMutation.mutate()
  }


  ngOnInit() {
    this.Searchempty();
  }

  handleSearchInvoices() {
    this.GetInvoicesMutation.mutate()
  }
}
