import { Component, OnInit } from '@angular/core';
import { PageTemplateComponent } from "../../../../layouts/page-template/page-template.component";
import { NzModalComponent } from "ng-zorro-antd/modal";
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule, DatePipe, formatDate, NgForOf, NgIf } from "@angular/common";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { CalenderService } from "../../../../data/services/calender/calender.service";
import { injectMutation } from "@tanstack/angular-query-experimental";
import { NzTagComponent } from "ng-zorro-antd/tag";
import { NzOptionComponent, NzSelectComponent } from "ng-zorro-antd/select";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import {NzPopoverDirective, NzPopoverModule} from "ng-zorro-antd/popover";
import { NzMessageService } from "ng-zorro-antd/message";
import { ClientsService } from "../../../../data/services/clients/clients.service";
import { ActivityService } from "../../../../data/services/Activity/activity.service";
import { InvoicesService } from "../../../../data/services/invoices/invoices.service";
import { StatsService } from "../../../../data/services/stats/stats.service";
import { fr_FR, NzI18nService } from 'ng-zorro-antd/i18n';
import { GraphService } from '../../../../data/services/graph/graph.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { BudgetsService } from '../../../../data/services/budgets/budgets.service';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { PaymentService } from '../../../../data/services/Payment/payment.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {NzColorPickerComponent} from "ng-zorro-antd/color-picker";
import {NzWaveDirective} from "ng-zorro-antd/core/wave";
import {NzRadioComponent, NzRadioGroupComponent} from "ng-zorro-antd/radio";
import { VacationWeeksService } from '../../../../data/services/vacation_weeks/vacation-weeks.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';


@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [
    NzSpinModule,
    PageTemplateComponent,
    NzModalComponent,
    TranslatePipe,
    ReactiveFormsModule,
    NgIf,
    CommonModule,
    NzButtonComponent,
    NgForOf,
    DatePipe,
    NzToolTipModule,
    NzTagComponent,
    NzTagModule,
    NzSelectComponent,
    NzOptionComponent,
    FormsModule,
    NzDatePickerModule,
    NzPopoverDirective,
    NzIconModule,
    NzUploadModule,
    NzInputNumberModule,
    DatePipe,
    NzSegmentedModule,
    NzPopoverModule,
    NzColorPickerComponent,
    NzWaveDirective,
    NzRadioGroupComponent,
    NzRadioComponent
  ],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.css'
})
export class CalenderComponent implements OnInit {


  handleChangeSetHour($event: any) {
    this.invoices.hours = $event;
  }


  fetchVacationWeeks = injectMutation(() => ({
    mutationFn: () => this._VacationService.getAll({ all: true, year: this.FilterDates.startDate }),
    onMutate: () => {
      this.isLoading = true;
    },
    onSuccess: (data: any) => {

      this.isLoading = false;

      // Parse server data and store disabled weeks in a Set
      data.data.forEach((entry:any) => {
        const key = `${entry.year}-${entry.week}`;
        this.disabledWeeks.add(key);
      });
    },
    onError: (error: any) => {
      this.isLoading = false;
    },
  }));


  disabledWeeks: Set<string> = new Set(); // Store disabled weeks as "year-week"



// Custom function to disable specific weeks
  disabledSpecificWeeks = (current: Date): boolean => {
    const year = current.getFullYear();
    const week = this.getWeekNumber(current); // Get the ISO week number
    const key = `${year}-${week}`;

    // Disable the date if its year-week is in the disabledWeeks Set
    return this.disabledWeeks.has(key);
  };

// Helper function to get the ISO week number of a date
  getWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7; // Adjust Sunday to be 7 instead of 0
    d.setUTCDate(d.getUTCDate() + 4 - dayNum); // Set to the nearest Thursday
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1)); // Start of the year
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }










  editingIndexMap1: { [key: number]: boolean } = {}; // Track editing states for each row

  /**
   * Start editing the total for the given index and invoice.
   */
  startEditingTotal( invoice: any): void {
    this.editingIndexMap1[invoice.id] = true; // Enable editing mode for the specific row
    this.fetchInvoicesById.mutate(invoice.id);

  }

  /**
   * Stop editing the total for the given index and invoice.
   */
  SelectedInvoice :any
  stopEditingTotal(invoice: any): void {
    this.editingIndexMap1[invoice.id] = false;
    this.SelectedInvoiceId = invoice.id;
    this.SelectedInvoice = invoice;
    this.UpdateOnlyTotal(invoice.total)

  }


  UpdateOnlyTotal(NewTotal : any) {
    // this.UpdateOnlyTotal(invoice.total)
    this.updateInvoices.mutate(
      {
        id: this.Selected_Item.id,
        data: {
          ... this.Selected_Item,
          total: NewTotal
        }
      },
      {
        onSuccess: () => {
          const payment = this.Selected_Item.payments[this.Selected_Item.payments.length - 1];
          if (payment.amount) { // Paye
            this.updatePaymentMutationPay.mutate(
              {
                id: payment.id,
                invoice_id: payment.invoice_id,
                amount: NewTotal,
              },
              {
                onSuccess: () => {
                  // Optionally trigger other mutations if needed
                  this.GetCalenderMutation.mutate();
                  this.GetUnpaidInvoicesStatsMutation.mutate();
                },
                onError: (error) => {
                }
              }
            );
          } else { // Non Paye
            this.updatePaymentMutationPay.mutate(
              {
                id: payment.id,
                invoice_id: payment.invoice_id,
                amount: 0,
              },
              {
                onSuccess: () => {
                  // Optionally trigger other mutations if needed
                  this.GetCalenderMutation.mutate();
                  this.GetUnpaidInvoicesStatsMutation.mutate();
                },
                onError: (error) => {
                }
              }
            );
          }
        },
        onError: (error) => {
        }
      }
    );



  }



  /**
   * Handle changes to the total value.
   */
  handleValueChange1(newValue: number): void {
    this.invoices.total = newValue
  }








  selectedInvoice : any ;
  isAddingPayment: boolean = false;


  isLoadingInvoicesDetails : boolean = false;



  fetchInvoicesById = injectMutation(() => ({
    mutationFn: (id: number) => this._InvoicesService.getById(id), // Récupérer les budgets pour une année spécifique
    onMutate: () => {
      this.isLoadingInvoicesDetails = true; // Afficher un indicateur de chargement
    },
    onSuccess: (data: any) => {
      this.isLoadingInvoicesDetails = false; // Masquer l'indicateur de chargement
      this.Selected_Item = data;
      this.fillForm(data)

    },
    onError: (error: any) => {
      this.isLoadingInvoicesDetails = false; // Masquer l'indicateur de chargement
    },
  }));




  updateInvoicesHours = injectMutation(() => ({
    mutationFn: (data: any) => this._InvoicesService.updateHoursDay(data.id ,data.data ),
    onMutate: () => {
      this.isAddingItem = true;
    },
    onSuccess: () => {
      this.isAddingItem = false;
      this.isAddModalOpen = false;


    },
    onError: () => {
      this.isAddingItem = false;
      this.message.error('Une erreur est survenue. Veuillez réessayer plus tard.')
    }
  }))

  updateInvoices = injectMutation(() => ({
    mutationFn: (data: any) => this._InvoicesService.update(data.id ,data.data ),
    onMutate: () => {
      this.isAddingItem = true;
    },
    onSuccess: () => {
      this.isAddingItem = false;
      this.isAddModalOpen = false;


    },
    onError: () => {
      this.isAddingItem = false;
      this.message.error('Une erreur est survenue. Veuillez réessayer plus tard.')
    }
  }))



  editingIndexMap: { [key: number]: boolean } = {};
  //handlinghours
  startEditing(index: number , item : any): void {
    this.editingIndexMap[item.id] = true;

    this.invoices.hours = item.hours

    this.fetchInvoicesById.mutate(item.id)

  }
  SELECTEDITEM : any;
  stopEditing(item : any): void {
    this.editingIndexMap[item.id] = false;
    this.SELECTEDITEM = {
      "work_date": item.invoice_date,
      "hours": this.invoices.hours
    }
    this.updateInvoicesHours.mutate(
      {
        id: this.Selected_Item.invoice_days[0].id,
        data: this.SELECTEDITEM
      },
      {
        onSuccess: () => {
          // this.GetInvoicesMutation.mutate()
          this.GetCalenderMutation.mutate();
          this.GetUnpaidInvoicesStatsMutation.mutate();
        },
        onError: (error) => {
        }
      }
    );








  }


  OpenDeleteModal(day: any) {
    this.isOpenDeleteModalInvoices = true;
    this.selectedInvoice = day
  }

  SelectedInvoiceId : any = null ;
  selectedInvoiceStatusPayment:any;
  Selected_Item : any;
  OpenEditModal(invoice: any) {
    this.selectedInvoiceStatusPayment =invoice.payments
    this.isEditMode = true;
    this.isAddModalOpen = true;
    this.fetchInvoicesById.mutate(invoice.id)
    this.SelectedInvoiceId = invoice.id;

  }

  isAddModalOpen: boolean = false;
  isEditMode: boolean = false;
  isAddingItem: boolean = false;
  form!: FormGroup;
  CalenderData: any =  [
    {
      "month": "01",
      "month_sum_total": 0,
      "weeks": [
        {
          "weekName": "S1",
          "invoices_sum_total": 0,
          "invoices": [],
          "totalHours": 0,
          "totalTrailors": 0,
          "totalAmount": 0,
          "totalPayments": 0,
          "days": [
            {"date": "2025-01-01", "invoices": [], "invoices_sum_total": 0},
            {"date": "2025-01-02", "invoices": [], "invoices_sum_total": 0},
            {"date": "2025-01-03", "invoices": [], "invoices_sum_total": 0},
            {"date": "2025-01-04", "invoices": [], "invoices_sum_total": 0},
            {"date": "2025-01-05", "invoices": [], "invoices_sum_total": 0},
            {"date": "2025-01-06", "invoices": [], "invoices_sum_total": 0},
            {"date": "2025-01-07", "invoices": [], "invoices_sum_total": 0}
          ]
        }
      ]
    }
  ];

  isOpenModalFilterDate: boolean = false;
  protected readonly Object = Object;
  isSearchingWithDate: boolean = false;
  FilterDates: { startDate: string, endDate: string } = { startDate: '', endDate: '' }
  date: any;
  isLoading: boolean = true;
  isModalActivitiesOpen: boolean = false;
  isLoadingGetLastPaymentsStats: boolean = true;
  lastPaymentsData: any;
  UnpaidInvoicesStats: any;
  isLoadingGetUnpaidInvoicesStats: boolean = true;
  isAddingActivity: boolean = false;
  Activity: string = '';
  selectedActivityToDeleteId: any;
  isOpenDeleteModal: boolean = false;
  isDeletingActivity: boolean = false;
  isLoadingGraph: boolean = true;
  GraphData: any;
  totalsMonth: any;
  totalsTable: any;

  constructor(private _VacationService : VacationWeeksService ,private translate : TranslateService , private fb: FormBuilder, private _Payments : PaymentService,private _Budgets : BudgetsService , private messageService: NzMessageService,private  _GraphService : GraphService, private i18n: NzI18nService, private _ActivitiesService: ActivityService, private _StatsService: StatsService, private _InvoicesService: InvoicesService, private _ClientService: ClientsService, private _ActivityService: ActivityService, private message: NzMessageService, private _CalenderService: CalenderService) {
    const savedColors = localStorage.getItem('colorsTotalJournee');
    if (savedColors) {
      this.colorsTotalJournee = JSON.parse(savedColors);
    }


    this.setCurrentWeekDates();
    this.i18n.setLocale(fr_FR);
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('fr');

    // this.GetInvoicesMutation.mutate()
    let year = new Date(this.FilterDates.startDate)
    this.FetchBudgetsMutation.mutate(year.getFullYear())

  }

  calculateTotalsTable(data: any[]): any {
    const result = data.reduce(
      (acc: any, item: any) => {
        acc.totalCountInvoices += item.count_invoices;
        acc.totalHoursInvoices += item.total_hours_invoices;
        acc.totalInvoices += item.total_invoices;
        acc.ratioSum += item.ratio;
        acc.ratioCount += 1;

        return acc;
      },
      {
        totalCountInvoices: 0,
        totalHoursInvoices: 0,
        totalInvoices: 0,
        ratioSum: 0,
        ratioCount: 0,
      }
    );

    // Calculate average ratio
    // result.avgRatio = result.ratioCount > 0 ? result.ratioSum / result.ratioCount : 0;
    result.avgRatio = result.ratioCount > 0 ? result.totalInvoices / result.totalHoursInvoices : 0;

    // Remove intermediate fields used for ratio calculation
    delete result.ratioSum;
    delete result.ratioCount;

    return result;
  }

  getColor(activity: string): string {
    const colors = [
      "#6CD6A8",
      "#916CD6",
      "#4CAF8F",
      "#7353A4",
      "#7CBF8D",
      "#9865C2",
      "#4BAF95",
      "#7F59B5",
      "#5EBF9C",
      "#895DBC",
      "#66D4AB",
      "#7C6FD5",
      "#49B089",
      "#7150A2",
      "#73CFA1",
      "#845ABF",
      "#3FAC8F",
      "#6F4EA1", ]
    const index = this.hashString(activity) % colors.length;
    return colors[index];
  }

  hashString(input: string): number {
    return Array.from(input).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  }
  options = ['petit', 'moyen', 'grand'];
  isLoadingBudgets :boolean = true
  budgets : any;
  FetchBudgetsMutation = injectMutation(() => ({
    mutationFn: (year: number) => this._Budgets.getAll({ year }), // Récupérer les budgets pour une année spécifique
    onMutate: () => {
      this.isLoadingBudgets = true; // Afficher un indicateur de chargement
    },
    onSuccess: (data: any) => {
      this.isLoadingBudgets = false; // Masquer l'indicateur de chargement
      this.budgets = data; // Stocker les budgets récupérés dans une variable locale
      this.GetGraphData.mutate(data.data[0].id)
      this.fetchVacationWeeks.mutate()

    },
    onError: (error: any) => {
      this.isLoadingBudgets = false; // Masquer l'indicateur de chargement
    },
  }));

  invocesloading : boolean = true
  invoices : any;
  GetInvoicesMutation = injectMutation(() => ({
    mutationFn: () => this._InvoicesService.getAll({all:true}),
    onMutate: () => {
      this.invocesloading = true;
    },
    onSuccess: (data: any) => {
      this.invocesloading = false;
      this.invoices = data;
      this.isAddModalOpen = false;
    },
    onError: () => {
      this.invocesloading = false;
      this.message.error('Error, please try again.');
    },
  }));

  setCurrentWeekDates() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Calculate the first and last day of the month
    const start = new Date(year, month, 1); // First day of the month
    const end = new Date(year, month + 1, 0); // Last day of the month

    // Format the dates to 'YYYY-MM-dd'
    const DateStart = formatDate(start, 'yyyy-MM-dd', 'fr-FR');
    const EndDate = formatDate(end, 'yyyy-MM-dd', 'fr-FR');

    // Assign formatted dates to the filter object
    this.FilterDates.startDate = DateStart;
    this.FilterDates.endDate = EndDate;
  }


  GetGraphData = injectMutation((client: any) => ({
    mutationFn: (budget_id : any) => this._GraphService.getAll({budget_id  : budget_id}),
    onMutate: () => {
      this.isLoadingGraph = true;
    },
    onSuccess: (data: any) => {
      this.isLoadingGraph = false;

      if (data) {

        if (data?.budget_realisation_comparison) {
          const aggregatedData = data.budget_realisation_comparison.reduce((acc: any, item: any) => {
            const existingMonth = acc.find((el: any) => el.month === item.month);
            if (existingMonth) {
              existingMonth.total += item.total;
              existingMonth.budget += parseFloat(item.budget);
            } else {
              acc.push({
                month: item.month,
                total: item.total,
                budget: parseFloat(item.budget)
              });
            }
            return acc;
          }, []);
          data.budget_realisation_comparison = aggregatedData;

        }
      }
      this.GraphData = data;
      this.totalsTable = this.calculateTotalsTable(data?.activities_data);
      client.invalidateQueries({ queryKey: ['graph'] });
    },
    onError: (error: any) => {
      this.isLoadingGraph = false;
    },
  }));

  activities: any;

  CalenderDataPure:any;
  // Fetch
  GetCalenderMutation = injectMutation((client: any) => ({
    mutationFn: () => this._CalenderService.getAll({ from: this.FilterDates.startDate, to: this.FilterDates.endDate }),
    onMutate: () => {
      this.isLoading = true;
    },
    onSuccess: (data: any) => {
      this.totalsMonth =  this.calculateMonthData(Object.values(data)[0])
      this.CalenderData = this.fillMonthData(this.FilterDates.startDate , this.FilterDates.endDate ,data );
      this.CalenderDataPure = data;
      this.isLoading = false;
      this.GetInvoicesMutation.mutate();
      client.invalidateQueries({ queryKey: ['calendar'] });
    },
    onError: (error: any) => {
      this.isLoading = false;
    },
  }));


  calculateMonthData = (monthData :any) => {
    const weeks = monthData?.weeks;
    const monthAggregates = {
      invoices_sum_total: 0,
      totalHours: 0,
      totalPayed: 0,
      totalAmount: 0,
    };

    for (const weekName in weeks) {
      const weekInvoices = weeks[weekName];

      weekInvoices.forEach((invoice:any) => {
        monthAggregates.invoices_sum_total += invoice.total;
        monthAggregates.totalHours += invoice.hours;
        monthAggregates.totalPayed += invoice.payments;
        monthAggregates.totalAmount += invoice.total;
      });
    }

    return monthAggregates;
  };

  fillMonthData(fromDate: string, toDate: string, serverData: any): any[] {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const weekData: { [weekName: string]: any } = {};

    // function getWeekName(date: Date): string {
    //   const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    //   const dayOfWeek = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)
    //   const dayNumber = date.getDate();
    //   return `S${Math.ceil((dayNumber + dayOfWeek) / 7)}`;
    // }
    function getWeekName(date: Date): string {
      // Set the target date to Monday of the current week
      const currentDate = new Date(date.getTime());
      currentDate.setHours(0, 0, 0, 0);

      // Thursday in the current week determines the year's week number
      const thursdayDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + (4 - (currentDate.getDay() || 7))
      );

      // January 1 of the same year
      const startOfYear = new Date(thursdayDate.getFullYear(), 0, 1);

      // Calculate the week number
      const weekNumber = Math.ceil(
        (((thursdayDate.getTime() - startOfYear.getTime()) / 86400000) + startOfYear.getDay() + 1) / 7
      );

      return `S${weekNumber}`;
    }


    // Flatten serverData to match expected structure
    const flattenedData: { [date: string]: any } = {};
    for (const monthKey in serverData) {
      const monthData = serverData[monthKey];
      for (const weekKey in monthData.weeks) {
        const weekInvoices = monthData.weeks[weekKey];
        weekInvoices.forEach((invoice: any) => {
          const date = invoice.invoice_date;
          if (!flattenedData[date]) {
            flattenedData[date] = {
              invoices_sum_total: 0,
              invoices: [],
            };
          }
          flattenedData[date].invoices_sum_total += invoice.total || 0;
          flattenedData[date].invoices.push(invoice);
        });
      }
    }

    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      const dateString = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      const weekName = getWeekName(date);

      // Initialize empty data for missing days
      if (!flattenedData[dateString]) {
        flattenedData[dateString] = {
          invoices_sum_total: 0,
          invoices: [],
        };
      }

      if (!weekData[weekName]) {
        weekData[weekName] = {
          weekName,
          invoices_sum_total: 0,
          invoices: [],
          totalHours: 0,
          totalTrailors: 0,
          totalAmount: 0,
          totalPayments: 0,
          days: [], // Track all days in this week
        };
      }

      // Add current day to the week
      weekData[weekName].days.push({
        date: dateString,
        invoices: flattenedData[dateString].invoices,
        invoices_sum_total: flattenedData[dateString].invoices_sum_total,
      });

      const serverEntry = flattenedData[dateString];
      weekData[weekName].invoices_sum_total += serverEntry.invoices_sum_total;

      serverEntry.invoices.forEach((invoice: any) => {
        weekData[weekName].invoices.push(invoice);
        weekData[weekName].totalHours += invoice.hours || 0;
        weekData[weekName].totalTrailors += invoice.trailers || 0;
        weekData[weekName].totalAmount += invoice.total || 0;
        weekData[weekName].totalPayments += invoice.payments || 0;
      });
    }

    const resultWeeks = Object.values(weekData).sort((a, b) => {
      const weekNumberA = parseInt(a.weekName.replace('S', ''), 10);
      const weekNumberB = parseInt(b.weekName.replace('S', ''), 10);
      return weekNumberA - weekNumberB;
    });

    return [
      {
        month: start.getMonth() + 1 < 10 ? `0${start.getMonth() + 1}` : (start.getMonth() + 1).toString(),
        month_sum_total: resultWeeks.reduce((sum, week) => sum + week.invoices_sum_total, 0),
        weeks: resultWeeks,
      },
    ];
  }













  GetClientMutation = injectMutation<any>(() => ({
    mutationKey: ['clients', 'all'],
    mutationFn: () => this._ClientService.getAll({ all: true }),
    staleTime: 60000,
    cacheTime: 60000,
  }));
  GetActivityMutation = injectMutation<any>(() => ({
    mutationKey: ['activity', 'all'],
    mutationFn: () => this._ActivityService.getAll({ all: true }),
    staleTime: 60000,
    cacheTime: 60000,
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
    mutationFn: () => this._StatsService.GetLastUnpaidClientsStats({ All:true }),
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

  updateInvoicesMutation = injectMutation(() => ({

    mutationFn: (data: any) => this._InvoicesService.update(this.SelectedInvoiceId , {
      ...data,

    }),

    onMutate: () => {
      this.isAddingItem = true;
    },
    onSuccess: () => {
      this.updateInvoicesHours.mutate(
        {
          id: this.Selected_Item.invoice_days[0].id,
          data: this.SELECTEDITEM
        },
        {
          onSuccess: () => {
          },
          onError: (error) => {
          }
        }
      );

      this.isAddingItem = false;
      this.isAddModalOpen = false;
      const payment = this.Selected_Item.payments[this.Selected_Item.payments.length - 1];

      if (this.form.value.statusPay == 1) { // Paye
        this.updatePaymentMutationPay.mutate(
          {
            id: payment.id,
            invoice_id: payment.invoice_id,
            amount: this.form.value.invoice_days[0].hours * this.form.value.Tarif_Hour,// reCheck
          },
          {
            onSuccess: () => {
              // Optionally trigger other mutations if needed
              this.GetCalenderMutation.mutate();
              this.GetUnpaidInvoicesStatsMutation.mutate();
            },
            onError: (error) => {
            }
          }
        );
      } else { // Non Paye
        this.updatePaymentMutationPay.mutate(
          {
            id: payment.id,
            invoice_id: payment.invoice_id,
            amount: 0,
          },
          {
            onSuccess: () => {
              // Optionally trigger other mutations if needed
              this.GetCalenderMutation.mutate();

              this.GetUnpaidInvoicesStatsMutation.mutate();
            },
            onError: (error) => {
            }
          }
        );
      }


    },
    onError: () => {
      this.isAddingItem = false;
      this.message.error('Une erreur est survenue. Veuillez réessayer plus tard.')
    }
  }))
  InvoicesMutation = injectMutation(() => ({
    mutationKey: ['invoices', 'all'],
    mutationFn: (data: any) => this._InvoicesService.create(data),
    onMutate: () => {
      this.isAddingItem = true;
    },
    onSuccess: (data :any) => {
      if (this.form.value.statusPay == 1){
        this.addPaymentMutation.mutate({invoice_id :  data.id, amount : this.form.value.invoice_days[0].hours * this.form.value.Tarif_Hour
        })

      }else {
        this.addPaymentMutation.mutate({invoice_id :data.id   , amount : 0 })

      }

    },
    onError: (error: any) => {

      this.isAddingItem = false;

      // Laravel validation error mappings
      const validationMessages: Record<string, string> = {
        'validation.exists': 'Cette valeur est déjà enregistrée.',
        'validation.required': 'Ce champ est obligatoire.',
        'validation.email': "Veuillez entrer une adresse e-mail valide.",
        'validation.min': 'Le champ doit contenir au moins {min} caractères.',
        'validation.max': 'Le champ ne doit pas dépasser {max} caractères.',
        'validation.unique': 'Cette adresse e-mail est déjà utilisée.',
        'validation.confirmed': 'La confirmation ne correspond pas.',
        'validation.password': 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.',
        'validation.different': 'Les deux champs doivent être différents.',
        'validation.date': "La date saisie n'est pas valide.",
        'validation.integer': 'Veuillez entrer un nombre entier.',
        'validation.regex': 'Le format est invalide.',
        'validation.between': 'La valeur doit être comprise entre {min} et {max}.',
        'validation.in': 'La sélection est invalide.',
        'validation.not_in': 'La sélection est invalide.',
        'validation.url': "Le format de l'URL est invalide.",
        'validation.alpha': 'Le champ ne peut contenir que des lettres.',
        'validation.alpha_num': 'Le champ ne peut contenir que des lettres et des chiffres.',
        'validation.alpha_dash': 'Le champ ne peut contenir que des lettres, des chiffres, des tirets et des underscores.',
        'validation.numeric': 'Le champ doit être un nombre.',
        'validation.array': 'Le champ doit être un tableau.',
        'validation.boolean': 'Le champ doit être vrai ou faux.',
        'validation.date_format': 'Le format de la date doit être {format}.',
        'validation.image': 'Le fichier doit être une image.',
        'validation.file': 'Le champ doit être un fichier.',
        'validation.mimes': 'Le fichier doit être de type: {values}.',
        'validation.size': 'Le champ doit être de taille {size}.',
      };

      // Default error message
      let errorMessage = 'Une erreur s\'est produite. Veuillez réessayer.';

      if (error?.error?.errors) {
        // Backend validation error structure
        const errorDetails = error.error.errors;
        const fieldErrors = Object.keys(errorDetails).map(field => {
          // Join multiple error messages for a single field
          const messages = errorDetails[field]
            .map((msg: string) => validationMessages[msg] || msg)
            .join(', ');

          return `Champ "${field}": ${messages}`;
        });

        // Join all field-specific errors
        errorMessage = fieldErrors.join('\n');
      } else if (error?.error?.message) {
        // Translate the general error message
        const translatedMessage = validationMessages[error.error.message] || error.error.message;
        errorMessage = translatedMessage;
      }

      // Display error as aa warning
      this.message.create('warning', errorMessage);
    },

  }))
  ActivitiesData: any;
  addActivitiesMutation = injectMutation(() => ({
    mutationFn: (data: any) => this._ActivitiesService.create(data),
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
      this.message.error("Erreur : Cette activité existe déjà.");
    }
  }));
  deleteActivitiesMutation = injectMutation(() => ({
    mutationFn: () => this._ActivitiesService.delete(this.selectedActivityToDeleteId),
    onMutate: () => {
      this.isDeletingActivity = true;
    },
    onSuccess: () => {
      this.isDeletingActivity = false;
      this.message.success('Activité a été bien supprimier');
      this.isOpenDeleteModal = false
      this.GetActivityMutation.mutate();
    },
    onError: () => {
      this.isDeletingActivity = false;
      this.message.error('Erreur, veuillez réessayer, car il existe des factures associées à cette activité.');

    }
  }));

  HandleCancelDelete() {
    this.isAddModalOpen = false;
  }

  formatDates(obj: any): any {
    if (this.isDateObject(obj)) {
      // Format valid Date objects
      return this.formatDateObject(obj);
    } else if (typeof obj === 'string' && this.isValidDate(obj)) {
      // Format valid date strings
      return this.formatDateString(obj);
    } else if (Array.isArray(obj)) {
      // Recursively process arrays
      return obj.map((item) => this.formatDates(item));
    } else if (obj && typeof obj === 'object') {
      // Recursively process objects
      return Object.keys(obj).reduce((acc, key) => {
        acc[key] = this.formatDates(obj[key]);
        return acc;
      }, {} as any);
    }
    return obj; // Return other types unchanged
  }

  // Helper to check if an object is a valid Date
  private isDateObject(value: any): boolean {
    return value instanceof Date && !isNaN(value.getTime());
  }

  // Helper to format a Date object to YYYY-MM-DD
  private formatDateObject(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  // Helper to validate date strings
  private isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }

  // Helper to format a valid date string to YYYY-MM-DD
  private formatDateString(dateString: string): string {
    return new Date(dateString).toISOString().split('T')[0];
  }



  getTotalForDate(date: any) {
    let total = 0;

    // Iterate through each month in the this.CalenderData
    for (const monthKey in this.CalenderDataPure) {
      const monthData = this.CalenderDataPure[monthKey];

      // Iterate through each week in the month's weeks
      for (const weekKey in monthData.weeks) {
        const weekData = monthData.weeks[weekKey];

        // Iterate through each entry in the week's data
        for (const entry of weekData) {
          if (entry.invoice_date == date) {
            total += entry.total; // Add the total for the matching date
          }
        }
      }
    }

    return total;
  }


  addPaymentMutation = injectMutation(() => ({
    mutationFn: (data: any) => this._Payments.createPaymentInvoices(data),
    onSuccess: () => {
      this.isAddingPayment = false;
      this.isAddingItem = false;

      this.isAddModalOpen = false;
      this.PayModalOpen = false;

      this.GetCalenderMutation.mutate();
      this.GetUnpaidInvoicesStatsMutation.mutate()

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
  addPaymentMutationPay = injectMutation(() => ({
    mutationFn: (data: any) => this._Payments.createPaymentInvoices(data),
    onSuccess: () => {
      this.isAddingPayment = false;
      this.isAddingItem = false;

      this.isAddModalOpen = false;

      this.GetUnpaidInvoicesStatsMutation.mutate()
      this.GetCalenderMutation.mutate()
      this.isAddingPayment = false;
      this.PayModalOpen = false;
      this.message.success("Le paiement a été ajouté avec succès !"); // Cas de succès

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

  updatePaymentMutationPay = injectMutation(() => ({
    mutationFn: (data: any) => this._Payments.updatePaymentInvoices(data.id ,data),
    onSuccess: () => {
      this.isAddingPayment = false;
      this.isAddingItem = false;

      this.isAddModalOpen = false;
      // this.GetCalenderMutation.mutate();
      // this.GetUnpaidInvoicesStatsMutation.mutate()

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

  ConfirmModal() {
    // Mark the form as dirty
    this.form.markAsDirty();
    const formattedFormValue = this.formatDates({
      ...this.form.value ,
      invoice_date : this.form.value.invoice_days[0]?.work_date,
      total  : this.form.value.invoice_days[0].hours * this.form.value.Tarif_Hour

    }); // Format the form data

    if (this.isEditMode) {

      this.SELECTEDITEM = {
        "work_date": formattedFormValue.invoice_days[0].work_date,
        "hours": formattedFormValue.invoice_days[0].hours,
      }
      // Perform the update operation directly with formatted values
      this.updateInvoicesMutation.mutate(formattedFormValue);


    } else {
      try {

        // Assign specific values for certain fields if needed
        if (formattedFormValue.trailers === undefined) {
          formattedFormValue.trailers = "0"; // Default value for trailers
        }
        // Perform the create operation directly with formatted values
        this.InvoicesMutation.mutate(formattedFormValue);
      } catch (error) {
      }
    }
  }



  saveColors() {
    localStorage.setItem('colorsTotalJournee', JSON.stringify(this.colorsTotalJournee));
  }



  isOpenModalColor : boolean = false;
  colorsTotalJournee = {
    low: '#FF3B30',    // Rouge pour < 100€
    medium: '#5DBF96', // Vert pour 100€ - 200€
    high: '#ffea00'    // Jaune pour > 200€
  };


  fillForm(data: any): void {
    this.form.patchValue({
      client_id: data.client_id || '',
      activity_id: data.activity_id || '',
      total: data.total || 0,
      Tarif_Hour :  (data.total / data.invoice_days[0].hours).toFixed(2) ,
      statusPay: data.payments_sum_amount != 0  ? 1 : 0,
      due_date: data.due_date || '',
      invoice_date: data.invoice_date || '',
    });
    const invoiceDays = data.invoice_days || [];
    const invoiceDaysFormArray = this.fb.array(
      invoiceDays.map((day: any) =>
        this.fb.group({
          work_date: day.work_date || '',
          hours: day.hours || '',
          trailers: day.trailers || 0,
        })
      )
    );

    this.form.setControl('invoice_days', invoiceDaysFormArray);
  }



  ngOnInit(): void {


    this.form = this.fb.group({
      client_id: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Required, integer
      activity_id: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Required, integer
      total: [0, [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]], // Required, numeric
      Tarif_Hour: [0, [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]], // Required, numeric
      due_date: ['', [Validators.required]], // Required, date, additional custom validation for "after today"
      invoice_date: ['', [Validators.required]], // Required, date
      statusPay: [0 ], // Required, date

      invoice_days: this.fb.array([
        this.fb.group({
          work_date: ['', [Validators.required]], // Required, date
          hours: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]], // Required, numeric
          trailers: [0], // Nullable, numeric
        })
      ])
    });
    this.GetCalenderMutation.mutate();
    this.GetClientMutation.mutate();
    this.GetActivityMutation.mutate();
    this.GetUnpaidInvoicesStatsMutation.mutate();
    this.GetLastPaymentsStatsMutation.mutate();
  }



  fileList: NzUploadFile[] = [];
  processing = false;


  savedBinaryData: { [key: string]: ArrayBuffer } = {}; // Ensure initialization

  saveFileAsBinary(file: File): void {
    this.processing = true;
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        // Save the binary data in savedBinaryData
        this.savedBinaryData[file.name] = reader.result as ArrayBuffer;
      }
      this.processing = false;
    };

    reader.onerror = () => {
      this.messageService.error(`Failed to read file "${file.name}".`);
      this.processing = false;
    };

    reader.readAsArrayBuffer(file); // Read file as binary
  }




  createInvoiceDay(): FormGroup {
    return this.fb.group({
      work_date: ['', [Validators.required]], // Required, date
      hours: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]], // Required, numeric
      trailers: [0], // Nullable, numeric
      invoice_days_sum_hours: [''], // Nullable, numeric
    });
  }

  get invoiceDays(): FormArray {
    return this.form.get('invoice_days') as FormArray;
  }

  addInvoiceDay(): void {
    this.invoiceDays.push(this.createInvoiceDay());
  }

  removeInvoiceDay(index: number): void {
    this.invoiceDays.removeAt(index);
  }

  submitForm(): void {
    if (this.form.valid) {
    } else {
    }
  }


  openModal(mode: string) {
    if (mode == 'EDIT') {
    } else if (mode == 'ADD') {
      this.isEditMode = false
      this.form.reset();
      this.isAddModalOpen = true;

    }
  }





  OpenModalFilterDate() {
    this.isOpenModalFilterDate = true;
  }

  onChangeDateFilter(date: Date) {

    if (date instanceof Date && !isNaN(date.getTime())) {
      // Extract year and month from the date
      const year = date.getFullYear();
      const month = date.getMonth(); // Month is zero-based (0 = January)

      // Calculate the first and last day of the month
      const start = new Date(year, month, 1); // Start of the month
      const end = new Date(year, month + 1, 0); // End of the month

      // Format the dates to 'YYYY-MM-dd'
      const DateStart = formatDate(start, 'yyyy-MM-dd', 'fr-FR');
      const EndDate = formatDate(end, 'yyyy-MM-dd', 'fr-FR');

      // Assign formatted dates to the filter object
      this.FilterDates.startDate = DateStart;
      this.FilterDates.endDate = EndDate;
    } else {
      // Handle case when input is invalid
      this.FilterDates.startDate = '';
      this.FilterDates.endDate = '';
    }

  }



  ComfirmModalFiltrage() {

    this.isOpenModalFilterDate = true;

    this.GetCalenderMutation.mutate(undefined, {
      onSuccess: () => {
        this.isSearchingWithDate = false;
      },
      onError: (error) => {
        this.isSearchingWithDate = false;
        this.setCurrentWeekDates();
        this.message.error('Problème lors du filtrage par date, veuillez réessayer');
      }
    });


  }
  OpenDelete(id: any) {
    this.selectedActivityToDeleteId = id;
    this.isOpenDeleteModal = true;
  }

  isOpenDeleteModalInvoices : boolean = false;
  handleCancelDeleteModalInvoices() {
    this.selectedInvoice = undefined;
    this.isOpenDeleteModalInvoices = false;
  }
  HandleComfirmDeleteModalInvoices() {
    this.deleteInvoicesMutation.mutate()

  }
  deleteInvoicesMutation = injectMutation(() => ({

    mutationFn: () => this._InvoicesService.delete(this.selectedInvoice.id),
    onMutate: () => {
      this.isDeletingActivity = true;
    },
    onSuccess: () => {
      this.isDeletingActivity = false;
      this.message.success('heure de travail a été supprimée');
      this.isOpenDeleteModalInvoices = false
      this.GetCalenderMutation.mutate();



    },
    onError: () => {
      this.isOpenDeleteModalInvoices = false
      this.message.error('Une erreur est survenue. Veuillez réessayer plus tard.')
    }
  }))

  handleCancelDeleteModal() {
    this.selectedActivityToDeleteId = undefined;
    this.isOpenDeleteModal = false;
  }
  HandleComfirmDeleteModal() {
    this.deleteActivitiesMutation.mutate()
  }

  handleCloseDateModal() {
    this.isOpenModalFilterDate = false;
  }

  getTotalAmountUnpaidInvoices() {
    const total = this.UnpaidInvoicesStats.reduce((sum: any, item: any) => sum + item.unpaid_amount, 0);
    return total;
  }

  OpenModalActivities() {
    this.isModalActivitiesOpen = true;
  }


  AddNewActivity() {
    this.addActivitiesMutation.mutate({
      name: this.Activity
    });
  }

  HandleCloseActivitiesModal() {
    this.isModalActivitiesOpen = false;
    this.Activity = '';
  }
  selected_Invoice : any;
  PayModalOpen : boolean = false ;
  PayClient(client: any) {
    this.selected_Invoice = client;

    this.PayModalOpen = true;
  }

  HandleCancelPaymentModal() {
    this.PayModalOpen =false;
  }

  comfirmPayment() {
    this.addPaymentMutationPay.mutate({invoice_id : this.selected_Invoice.invoice_id   , amount : this.selected_Invoice.unpaid_amount })
  }

}
