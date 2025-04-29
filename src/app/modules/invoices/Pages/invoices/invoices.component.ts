import { Component, HostListener, OnInit } from '@angular/core';
import { PageTemplateComponent } from "../../../../layouts/page-template/page-template.component";
import { injectMutation } from '@tanstack/angular-query-experimental';
import { InvoicesService } from '../../../../data/services/invoices/invoices.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ClientsService } from '../../../../data/services/clients/clients.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ActivityService } from '../../../../data/services/Activity/activity.service';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [PageTemplateComponent, NzTableModule, FormsModule, NzModalModule, ReactiveFormsModule, NzButtonModule, NzDatePickerModule, NzSelectModule, NzPopoverModule, CommonModule, NzPaginationModule, NzTagModule],
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css'],
})
export class InvoicesComponent implements OnInit {
  isAddingItem: boolean = false;
  isAddModalOpen = false;
  selectedItemInvoices: any;
  loading = false;
  isEditMode: boolean = false;
  invoices: any;
  form!: FormGroup;
  selectedInvoicesID: any;
  isModalActivitiesOpen: boolean = false;
  isAddingActivity: boolean = false;
  ActivitiesData: any;
  Activity: string = '';
  selectedActivityToDeleteId: any;
  isOpenDeleteModal: boolean = false;
  isDeletingActivity: boolean = false;
  isMobileScreen = window.innerWidth <= 768; // Adjust the breakpoint as needed

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const target = event.target as Window;
    this.isMobileScreen = target.innerWidth <= 768;
  } constructor(
    private _InvoicesService: InvoicesService,
    private message: NzMessageService,
    private fb: FormBuilder,
    private _ClientService: ClientsService,
    private _ActivityService: ActivityService,

  ) {
    this.InvoicesMutation.mutate();
    this.GetClientMutation.mutate();
    this.GetActivityMutation.mutate();

  }
  disablePastDates = (current: Date): boolean => {
    // Disable dates before today
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight
    return current && current < today; // Disable all dates before today
  };

  GetActivityMutation = injectMutation<any>(() => ({
    mutationKey: ['activity', 'all'],
    mutationFn: () => this._ActivityService.getAll({ all: true }),
    staleTime: 60000,
    cacheTime: 60000,
  }));

  GetClientMutation = injectMutation<any>(() => ({
    mutationKey: ['clients', 'all'],
    mutationFn: () => this._ClientService.getAll({ all: true }),
    staleTime: 60000,
    cacheTime: 60000,
  }));

  OpenModalActivities() {
    this.isModalActivitiesOpen = true;
  }
  OpenDelete(id: any) {
    this.selectedInvoicesID = id;
    this.isOpenDeleteModal = true;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      client_id: ['', Validators.required],
      date: ['', Validators.required],
      activity_id: ['', Validators.required],
      hourlyRate: ['', Validators.required],
      hours: ['', Validators.required],
      invoice: [''],
      total: ['', Validators.required],
      trailers: ['', Validators.required],
      due_date: ['', Validators.required],

    });
  }
  OpenEditModal(data: any) {
    this.isEditMode = true;
    this.selectedItemInvoices = data;
    this.isAddModalOpen = true;


    this.form.patchValue({
      client_id: data.client.id,
      date: data.created_at.split('T')[0],
      activity_id: data.activity.id,
      hourlyRate: parseFloat(data.payments_sum_amount),
      hours: data.hours,
      invoice: data.invoice || '',
      total: data.total,
      trailers: data.trailers,
      due_date: data.due_date,
    });

  }
  currentPage: number = 1;
  searchValue = '';
  from: string = '';
  to: string = ''
  InvoicesMutation = injectMutation(() => ({
    mutationKey: ['invoices', 'all'],
    mutationFn: () => this._InvoicesService.getAll({
      page: this.currentPage,
      search: this.searchValue,
      from: this.from,
      to: this.to
    }),
    onMutate: () => {
      this.loading = true;
    },
    onSuccess: (data: any) => {
      this.loading = false;
      this.invoices = data;
      this.message.success('Invoices have been successfully created');
      this.isAddModalOpen = false;
    },
    onError: () => {
      this.loading = false;
      this.message.error('Error, please try again.');
    },
  }));
  addInvoicesMutation = injectMutation(() => ({
    mutationKey: ['invoices', 'all'],
    mutationFn: (data: any) => this._InvoicesService.create(data),
    onMutate: () => {
      this.isAddingItem = true;
    },
    onSuccess: () => {
      this.isAddingItem = false;
      this.message.success('heure de travail a été créées avec succès.');
      this.isAddModalOpen = false;
      this.InvoicesMutation.mutate();

    },
    onError: () => {
      this.isAddingItem = false;
      this.message.error('Une erreur est survenue. Veuillez réessayer plus tard.')
    }
  }))
  addActivitiesMutation = injectMutation(() => ({
    mutationFn: (data: any) => this._ActivityService.create(data),
    onMutate: () => {
      this.isAddingActivity = true;
    },
    onSuccess: (data: any) => {
      this.isAddingActivity = false;
      this.message.success('Activité a été bien créé');
      this.ActivitiesData = data;
      this.Activity = "";
      this.GetActivityMutation.mutate();
    },
    onError: () => {
      this.isAddingActivity = false;
      this.message.error('Erreur, veuillez réessayer');
    }
  }));

  editactivitiesMutation = injectMutation(() => ({
    mutationFn: (data: any) => this._ActivityService.update(this.selectedItemInvoices.id, data),
    onMutate: () => {
      this.isAddingActivity = true;
    },
    onSuccess: (data: any) => {
      this.isAddingActivity = false;
      this.message.success('Votre activité a été bien créée');
      this.ActivitiesData = data;
      this.Activity = "";
      this.GetActivityMutation.mutate();
    },
    onError: () => {
      this.isAddingActivity = false;
      this.message.error('Erreur, veuillez réessayer');
    }
  }));

  updateInvoicesMutation = injectMutation(() => ({
    mutationKey: ['invoices', 'all'],
    mutationFn: (data: any) => this._InvoicesService.update(this.selectedItemInvoices.id, {
      ...this.form.value,
      user_id: data.client_id
    }),
    onMutate: () => {
      this.isAddingItem = true;
    },
    onSuccess: () => {
      this.isAddingItem = false;
      this.isAddModalOpen = false;
      this.InvoicesMutation.mutate();

    },
    onError: () => {
      this.isAddingItem = false;
      this.message.error('Une erreur est survenue. Veuillez réessayer plus tard.')
    }
  }))
  deleteInvoicesMutation = injectMutation(() => ({

    mutationFn: () => this._InvoicesService.delete(this.selectedInvoicesID.id),
    onMutate: () => {
      this.isDeletingActivity = true;
    },
    onSuccess: () => {
      this.isDeletingActivity = false;
      this.message.success('La ligne a été supprimé avec succés !');
      this.isAddModalOpen = false;
      this.isOpenDeleteModal = false
      this.InvoicesMutation.mutate();

    },
    onError: () => {
      this.isDeletingActivity = false;
      this.isOpenDeleteModal = false
      this.message.error('Une erreur est survenue. Veuillez réessayer plus tard.')
    }
  }))
  AddNewActivity() {
    this.addActivitiesMutation.mutate({
      name: this.Activity
    });
  }
  HandleCloseActivitiesModal() {
    this.isModalActivitiesOpen = false;
    this.Activity = '';
  }

  handleCancelDeleteModal() {
    this.selectedActivityToDeleteId = undefined;
    this.isOpenDeleteModal = false;
  }


  onChange(data: any) {
    this.currentPage = data
    this.InvoicesMutation.mutate();
  }
  openModal(mode: string) {
    if (mode == 'EDIT') {
    } else if (mode == 'ADD') {
      this.isEditMode = false;
      this.form.reset();
      this.isAddModalOpen = true;

    }
  }

  HandleCancelDelete() {

    this.isAddModalOpen = false;
  }
  HandleComfirmDeleteModal() {
    this.deleteInvoicesMutation.mutate()
  }

  ComfirmModal() {
    if (this.isEditMode) {
      this.updateInvoicesMutation.mutate(this.form.value)
    } else {
      this.addInvoicesMutation.mutate(this.form.value)

    }
  }
}
