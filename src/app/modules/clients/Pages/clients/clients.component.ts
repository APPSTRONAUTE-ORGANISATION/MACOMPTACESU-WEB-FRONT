import { Component, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { PageTemplateComponent } from "../../../../layouts/page-template/page-template.component";
import { NzSegmentedModule, NzSegmentedOption } from 'ng-zorro-antd/segmented';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { ClientsService } from '../../../../data/services/clients/clients.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";

import { NgApexchartsModule } from "ng-apexcharts";
import {Router} from "@angular/router";
import { ReplacePipe } from "../../../../shared/pipes/replace/replace.pipe";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};



export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart & {
    border?: {
      top?: string,
      right?: string,
      bottom?: string,
      left?: string,
      borderRadius?: string; // Optional border radius property
    };
  };
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};



@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [PageTemplateComponent,TranslatePipe,NzEmptyModule,TranslateModule, NzSwitchModule, NgApexchartsModule, ReactiveFormsModule, NzTableModule, NzPopoverModule, NzButtonModule, NzTagModule, NzSegmentedModule, FormsModule, CommonModule, NzPaginationModule, NzModalModule, ReplacePipe],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {


  isNotesModalOpen = false;
  isMobileScreen = window.innerWidth <= 768; // Adjust the breakpoint as needed

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const target = event.target as Window;
    this.isMobileScreen = target.innerWidth <= 768;
  }

  openNotesModal(data: any): void {
    if (!data) return;

    this.formData = { ...data };
    console.log('Opening notes modal with data:', this.formData);

    this.form.patchValue(this.formData);

    this.isEditMode = true;
    this.isAddClientModalVisible = true;
    this.isNotesModalOpen = true;
  }

  isAscending: boolean = true; // Add this property to track sort order

  sortByName() {
    if(this.DataClientCalender.length > 0){
      this.DataClientCalender = this.DataClientCalender.sort((a, b) =>
        this.isAscending
          ? a.first_name.localeCompare(b.first_name)
          : b.first_name.localeCompare(a.first_name)
      );
      this.isAscending = !this.isAscending; // Toggle the order for next click
      this.updateChart()
    }else {
      this.message.warning("Il n'y a pas de données à trier")
    }


  }
  isAscendingTotal: boolean = true; // Track sorting order for Total

  sortByTotal() {
    if (this.DataClientCalender){
      this.DataClientCalender = this.DataClientCalender.sort((a, b) =>
        this.isAscendingTotal
          ? (a.total ?? 0) - (b.total ?? 0)
          : (b.total ?? 0) - (a.total ?? 0)
      );
      this.isAscendingTotal = !this.isAscendingTotal; // Toggle sorting order
      this.updateChart()
    }else {
      this.message.warning("Il n'y a pas de données à trier")
    }

}

  public chartOptions: Partial<ChartOptions>;
  isOpenDeleteModal: boolean = false;

  constructor(private fb : FormBuilder, private translate: TranslateService , private notification: NzNotificationService, private router : Router, private _ClientService: ClientsService, private message: NzMessageService) {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('fr');
    this.mutation.mutate();
    this.getTotalClientsDataMutation.mutate({});
    // Assuming you have the backend data stored in 'DataClientCalender'

    this.chartOptions = {
      series: [
        {
          // Using the 'total' or summing the monthly values as data
          data: this.DataClientCalender.map(e =>
            Number(e.jan) + Number(e.feb) + Number(e.mar) + Number(e.apr) +
            Number(e.may) + Number(e.jun) + Number(e.jul) + Number(e.aug) +
            Number(e.sep) + Number(e.oct) + Number(e.nov) + Number(e.dec)
          )
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function() {
            // Handle chart click events here
          }
        },
        border: {
          top: "2px solid #000",  // Add top border here
          borderRadius : "10px"

        }
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8"
      ],
      plotOptions: {
        bar: {
          columnWidth: "15px",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      yaxis: {
        min: 0, // Ensures the y-axis starts from 0
        labels: {
          formatter: function (value: any) {
            if (value >= 1000000000000) {
              return `${(value / 1000000000000).toFixed(2)}T€`; // Converts value to trillions and appends €
            } else if (value >= 1000000000) {
              return `${(value / 1000000000).toFixed(2)}B€`; // Converts value to billions and appends €
            } else if (value >= 1000000) {
              return `${(value / 1000000).toFixed(2)}M€`; // Converts value to millions and appends €
            } else if (value >= 1000) {
              return `${(value / 1000).toFixed(2)}K€`; // Converts value to thousands and appends €
            }
            return `${value.toFixed(2)}€`; // Formats values below 1000
          }
        }
      },
      xaxis: {
        // Displaying first name and last name for each entry
        categories: this.DataClientCalender.map(e => `${e.first_name} ${e.last_name}`),
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
              "#546E7A",
              "#26a69a",
              "#D10CE8"
            ],
            fontSize: "12px"
          }
        }
      }
    };


    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      address: [''],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      notes: ['']
    });

  }
  @ViewChild("chart")
  chart!: ChartComponent;

  @ViewChild('temp', { static: true, read: TemplateRef }) templateRef!: TemplateRef<{
    $implicit: NzSegmentedOption;
    index: number;
  }>;

  page = 0;
  currentPage: any = 1;

  options = [
    { label: 'Informations clients', value: 'client1', useTemplate: true },
    { label: 'Total clients', value: 'client2', useTemplate: true },
  ];

  detailsClientDrawer: boolean = false;
  isEditMode: boolean = false;
  formData: any;
  form!: FormGroup;
  isAddClientModalVisible = false;
  isAddingClient = false;
  clients: any[] = [];
  searchValue = '';
  isDeletingUser: boolean = false;
  from: string = '';
  to: string = '';
  DataClientCalender: any[] = [];
  clientsData : any;

  // Fetch clients with cache and staleTime options
  isLoadingClients = true;  // Variable to track the loading state




  mutation = injectMutation<any, any>(() => ({
    mutationKey: ['clients', this.currentPage],
    mutationFn: () => this._ClientService.getAll({ page: this.currentPage, search: this.searchValue }),
    onMutate: () => {
      this.isLoadingClients = true;  // Set loading to true before the mutation starts
    },
    onSuccess: (data : any) => {
      this.isLoadingClients = false; // Set loading to false when mutation is successful
      this.clientsData = data;       // Save the mutated data

    },
    onError: () => {
      this.isLoadingClients = false; // Set loading to false in case of error
    },
    onSettled: () => {
      this.isLoadingClients = false; // Ensure loading is false once mutation is settled
    }
  }));

  // Fetch clients with cache and staleTime options
  getTotalClientsDataMutation = injectMutation<any, any, { page?: number; search?: string; from?: Date; to?: Date }>(
    () => ({
      mutationFn: () =>
        this._ClientService.getTotalClientsData({
          page: this.currentPage,
          search: this.searchValue,
          from: this.from,
          to: this.to
        }),
      onSuccess: (data) => {
        console.log('Successfully updated clients data:', data);
        this.DataClientCalender = data;
        this.updateChart();
      },
      onError: (error) => {
        console.error('Error updating clients data:', error);
      }
    })
  );

  // Add new client mutation
  addClientMutation = injectMutation(() => ({
    mutationFn: (data: any) => this._ClientService.create(data),
      onSuccess: () => {
        this.mutation.mutate()
    },
  }));

  // Update client mutation
  updateClientMutation = injectMutation(() => ({
    mutationFn: (client: any) => this._ClientService.update(client.id, client),
      onSuccess: () => {
        this.mutation.mutate()
    },
  }));

  // Delete client mutation
  deleteClientMutation = injectMutation(() => ({
    mutationFn: (clientId: number) => this._ClientService.delete(clientId),
      onSuccess: () => {
        this.mutation.mutate()
    },
  }));
  getTotalForMonth(month: string): number {
    return this.DataClientCalender ? this.DataClientCalender.reduce((acc, item) => acc + Number(item[month]), 0) : 0;
  }


  getNonNullTotalsAndNames(data: any[]): { totals: number[], names: string[] } {
    const items = data
      .filter(item => item.total !== null)
      .map(item => ({ total: item.total, name: `${item.first_name} ${item.last_name}` }));


    // Extract sorted totals and names
    const totals = items.map(item => item.total);
    const names = items.map(item => item.name);

    return { totals, names };
  }

  updateChart() {
    // Set chart options once data is available
    this.chartOptions = {

      series: [
        {
          name: "",
          data: this.getNonNullTotalsAndNames(this.DataClientCalender).totals
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function () {
            // Handle chart click events
          }
        }
      },
      colors: [
        "#6366F1"
      ],
      plotOptions: {
        bar: {
          columnWidth: "15px",
          distributed: true,
          borderRadius: 4, // Optional: Adds rounded corners to the bars
          borderRadiusApplication: "around", // Ensures only the top corners are rounded
          borderRadiusWhenStacked: "all",

        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      yaxis: {
        tickAmount: 5,  // Number of ticks on Y-axis (adjust as needed)
        min: 0,
        labels: {
          formatter: function (value: any) {
            return `${value.toFixed(2)}€`;
          }
        }
      },
      xaxis: {
        categories: this.getNonNullTotalsAndNames(this.DataClientCalender).names,
        labels: {
          style: {
            colors: [
              "#6366F1"
            ],
            fontSize: "12px"
          }
        }
      }
    };

  }

  OpenDrawerDetails(data: any) {
    this.detailsClientDrawer = true;
    this.router.navigate(['/clients/'+ data.id])
    this.formData = data;
  }

  changePage($event: number) {
    this.currentPage = $event;
    this.mutation.mutate()
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }



  search(searchQuery: any): void {
    this.currentPage = 1;
    this.searchValue = searchQuery;
    this.mutation.mutate()
  }

  DeleteClient(data: any): void {
    this.formData = data;
    this.isOpenDeleteModal = true;


  }

  showModalEdit(data: any) {
    this.formData = data;

    this.isAddClientModalVisible = true;
    this.isEditMode = true;
    this.form.patchValue(this.formData);
  }

  showModal(): void {
    this.form.reset()
    this.isAddClientModalVisible = true;
    this.isEditMode = false;
  }

  handleOk(): void {
    // Check if the form is valid

    let isValid = true; // Assume all required fields are valid initially
    const requiredFields = ['first_name', 'last_name'];

    requiredFields.forEach((field) => {
      if (this.form.get(field)?.invalid) {
        isValid = false; // If any required field is invalid, set isValid to false
      }
    });


    if (this.form.get('phone')?.value) {
      const phone = this.form.get('phone')?.value;
      if (phone.length !== 10) {
        this.message.error('Le numéro de téléphone doit comporter exactement 10 chiffres');
        isValid = false;
      }
    }
    if (this.form.get('email')?.value) {
      const email = this.form.get('email')?.value;
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        this.message.error("L'adresse e-mail est invalide");
        isValid = false;
      }
    }



    const handleSuccessMessage = () => {
      this.createMessage('success', 'Bien effectuée');
      this.form.reset();
      this.isAddClientModalVisible = false; // Close the modal only on success
      this.isAddingClient = false;
    };

    const handleErrorMessage = (error: any) => {
      this.isAddingClient = false; // Stop the loading indicator on error
      let errors = ''; // Initialize errors variable
      for (const key in error.error.errors) {
        if (error.error.errors[key]) {
          error.error.errors[key].forEach((message: string) => {
            if (message === 'The email field is required.') {
              errors += '- Le champ de l\'email est requis.\n';
            } else if (message === 'The password field is required.') {
              errors += '- Le champ du mot de passe est requis.\n';
            } else if (message === 'The first name field is required.') {
              errors += '- Le champ du prénom est requis.\n';
            } else if (message === 'The last name field is required.') {
              errors += '- Le champ du nom de famille est requis.\n';
            } else if (message === 'The country field is required.') {
              errors += '- Le champ du pays est requis.\n';
            } else if (message === 'The phone field is required.') {
              errors += '- Le champ du téléphone est requis.\n';
            } else if (message === 'The job field is required.') {
              errors += '- Le champ du poste est requis.\n';
            } else {
              errors += message + '\n'; // Default to the original message
            }
          });
        }
      }

      this.notification.warning('Erreur de validation', errors, {
        nzDuration: 5000,   // Duration the notification will be visible (5 seconds)
        nzAnimate: true,    // Optional: If you want to enable animation
        nzPlacement: 'topRight', // Placement of the notification (top-right, etc.)
        nzStyle: { whiteSpace: 'pre-wrap' } // Preserve line breaks in the message
      });
    };

    if(isValid){
      this.isAddingClient = true;
      if (this.isEditMode) {
        this.updateClientMutation.mutate(this.form.value, {
          onSuccess: () => {
            handleSuccessMessage();
          },
          onError: (error) => {
            handleErrorMessage(error);
          },
        });
      } else {
        this.addClientMutation.mutate(this.form.value, {
          onSuccess: () => {
            handleSuccessMessage();
          },
          onError: (error) => {
            handleErrorMessage(error);
          },
        });
      }
    }else {
      this.isAddingClient = false; //
      // Mark all controls as dirty to trigger validation messages
      Object.keys(this.form.controls).forEach((key) => {
        const control = this.form.get(key);
        if (control) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }

  }


  handleCancel(): void {
    this.isAddClientModalVisible = false;
    this.isOpenDeleteModal = false;
    this.isNotesModalOpen = false;

  }


  HandleComfirmDelete() {
    this.isDeletingUser = true

    this.deleteClientMutation.mutate(this.formData.id, {
      onSuccess: () => {
        this.createMessage('success', 'Client a été bien supprimé');
        this.isDeletingUser = false
        this.isOpenDeleteModal = false;
      },
      onError: (error) => {
        this.createMessage('error', 'Échec de la suppression du client');
        this.isDeletingUser = false

      },
    });
  }

  getTotalForYear() {
    return this.DataClientCalender.reduce((sum, item) => {
      return sum + (parseFloat(item.total) || 0);
    }, 0);
  }
}
