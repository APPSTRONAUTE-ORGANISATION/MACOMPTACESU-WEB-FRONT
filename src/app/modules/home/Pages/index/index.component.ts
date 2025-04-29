import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { PageTemplateComponent } from "../../../../layouts/page-template/page-template.component";
import { Chart, registerables } from 'chart.js';
import { ChartComponent } from "ng-apexcharts";
import { injectMutation } from "@tanstack/angular-query-experimental";
import { StatsService } from "../../../../data/services/stats/stats.service";
import { formatDate } from '@angular/common';
import {
  CommonModule,
  CurrencyPipe,
  NgClass,
  NgForOf,
  NgIf,
  NgOptimizedImage
} from "@angular/common";
import { NzSpinComponent } from "ng-zorro-antd/spin";
import { NzEmptyComponent } from "ng-zorro-antd/empty";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzDatePickerComponent, NzRangePickerComponent } from "ng-zorro-antd/date-picker";
import { NzPopoverDirective } from "ng-zorro-antd/popover";
import { FormsModule } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd/message";
import { RouterModule } from '@angular/router';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { GraphService } from '../../../../data/services/graph/graph.service';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { BudgetsService } from '../../../../data/services/budgets/budgets.service';
import { ShortenNumberPipe } from '../../../../shared/pipes/shortenNumber/shorten-number.pipe';
import { ReplacePipe } from '../../../../shared/pipes/replace/replace.pipe';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { NzOptionComponent, NzSelectComponent } from "ng-zorro-antd/select";
import { NzModalComponent } from "ng-zorro-antd/modal";
import { NzWaveDirective } from "ng-zorro-antd/core/wave";
import { PaymentService } from "../../../../data/services/Payment/payment.service";
import { InvoicesService } from "../../../../data/services/invoices/invoices.service";

Chart.register(...registerables);


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [PageTemplateComponent, ReplacePipe, TranslatePipe, NzToolTipModule, ShortenNumberPipe, NzSegmentedModule, NzListModule, CommonModule, NzTagModule, CurrencyPipe, ChartComponent, NgIf, NgClass, NzSpinComponent, NgForOf, RouterModule, NzEmptyComponent, NzButtonComponent, NzDatePickerComponent, NzPopoverDirective, FormsModule, NzModalComponent, NzWaveDirective],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  @ViewChild("chartTotalRevenu") chartTotalRevenu: ChartComponent | undefined;
  public chartOptions1: any = {};
  public chartOptions3: any = {};
  public chartOptionsWorkdedHours: any;

  isLoadingGetInvoicesStats: boolean = false;
  FilterDates: number = new Date().getFullYear();
  InvoicesStatsData: any = { labels: [], percentage: 0, data: [], total: 0 };
  UnpaidInvoicesStats: any = { labels: [], percentage: 0, data: [], total: 0 };
  GetClientsStatsData: any = { labels: [], percentage: 0, data: [], total: 0 };
  isLoadingGetUnpaidInvoicesStats: boolean = true;
  isLoadingGetLastUnpaidClientsStats: boolean = true;
  isLoadingGetWorkHoursStats: boolean = true;
  isLoadingGetLastPaymentsStats: boolean = true;
  isLoadingGetClientsStats: boolean = false;
  lastPaymentsData: any;
  LastUnpaidClientsData: any;
  dateFormat = 'yyyy';
  date: any;
  isSearchingWithDate: boolean = false;
  isLoadingGraph: boolean = true;
  GraphData: any;
  totalsTable: any;
  currentYear: any;
  currentDateG = new Date().getFullYear();
  chartOptions4: any = {};
  isLoadingBudgets: boolean = false;
  budgets: any;
  SelectedBudget: any;
  count!: string | number;
  isPopoverVisible: boolean = false;
  clientStatsData: any;
  InvoicesStatsDataServer: any;
  startDateTotalRevenu: any;
  endDateTotalRevenu: any;
  startDateClient: any;
  endDateClient: any;


  change(visible: boolean): void {
    this.isPopoverVisible = visible;  // Handles the visibility change
  }
  SelectedYear: Date = new Date();


  onChange1(result: any): void {
    if (result == null) {
      this.SelectedYear = new Date()

      let YEAR = this.SelectedYear.getFullYear()
      this.FetchBudgetsMutation.mutate(YEAR)
      this.GetWorkHoursStatsMutation.mutate()

    } else {
      this.SelectedYear = new Date(result)

      let YEAR = this.SelectedYear.getFullYear()
      this.FetchBudgetsMutation.mutate(YEAR)
      this.GetWorkHoursStatsMutation.mutate()

    }
  }

  getMonthName(monthNumber: number): string {
    const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];

    if (monthNumber < 1 || monthNumber > 12) {
      throw new Error('Invalid month number. Please provide a number between 1 and 12.');
    }

    return months[monthNumber - 1];
  }
  average: number = 0;


  resetpage() {
    this.SelectedYear = new Date();

    const currentDate = new Date().getFullYear();

    this.FetchBudgetsMutation.mutate(currentDate)

    this.GetInvoicesStatsMutation.mutate({});
    this.GetLastUnpaidClientsStatsMutation.mutate();
    this.GetLastPaymentsStatsMutation.mutate();
    this.GetWorkHoursStatsMutation.mutate();
    this.GetUnpaidInvoicesStatsMutation.mutate();
    this.GetClientsStatsMutation.mutate({});

  }
  constructor(private _InvoicesService: InvoicesService, private _Payments: PaymentService, private translate: TranslateService, private _StatsService: StatsService, private _Budgets: BudgetsService, private _GraphService: GraphService, private message: NzMessageService) {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('fr');
    // let daysBetweenDates = this.getWeekdaysBetweenDates(this.FilterDates.startDate , this.FilterDates.endDate)

    const savedBudgetValues = localStorage.getItem('budgetValues');
    if (savedBudgetValues) {
      this.budgetValues = JSON.parse(savedBudgetValues);
    }


    const currentDate = new Date().getFullYear();

    this.FetchBudgetsMutation.mutate(currentDate)
    this.GetInvoicesMonthsBudgetMutation.mutate();
    this.GetInvoicesStatsMutation.mutate({});
    this.GetLastUnpaidClientsStatsMutation.mutate();
    this.GetLastPaymentsStatsMutation.mutate();
    this.GetWorkHoursStatsMutation.mutate();
    this.GetUnpaidInvoicesStatsMutation.mutate();
    this.GetClientsStatsMutation.mutate({});
  }

  MonthDataInvoices: any[] = [];
  getMonthDataInvoices() {
    const fullMonthData = [];

    for (let month = 1; month <= 12; month++) {
      const monthItem = this.GraphData?.budget_realisation_comparison.find(
        (item: { month: number }) => item.month === month
      );

      // Push the total_invoices, or 0 if it's missing or null
      fullMonthData.push({
        month: month, // Keep this as a number for clarity
        total: monthItem?.total || 0,
        budget: parseFloat(this.SelectedBudget.amount) / 12,
        diffrence: (monthItem?.total || 0) - (parseFloat(this.SelectedBudget.amount) / 12),
      });
    }



    return fullMonthData;
  }


  options = ['PETIT', 'MOYEN', 'GRAND'];

  handleValueChange(e: number): void {
    const petitEntries = this.budgets.data.filter((item: any) => item.name === this.options[e]);
    let lastidbudget = petitEntries[petitEntries.length - 1].id
    this.SelectedBudget = petitEntries[petitEntries.length - 1]

    this.GetGraphData.mutate(lastidbudget)
    this.FetchBudgetbyIDMutation.mutate(lastidbudget)

  }







  removeDuplicateWeeks(yearWeeks: { [x: string]: any; }) {
    const seenWeeks: any = new Set();
    const cleanedYearWeeks: any = {};

    for (const year in yearWeeks) {
      const weeks: any = yearWeeks[year];
      const filteredWeeks: any = {};

      for (const week in weeks) {
        if (!seenWeeks.has(week)) {
          seenWeeks.add(week);
          filteredWeeks[week] = weeks[week];
        }
      }

      if (Object.keys(filteredWeeks).length > 0) {
        cleanedYearWeeks[year] = filteredWeeks;
      }
    }

    return cleanedYearWeeks;
  }


  calculateTotal(data: any) {
    let total = 0;
    let budget = 0;

    for (const group in data) {
      for (const subGroup in data[group]) {
        total += data[group][subGroup].invoices;
        budget += data[group][subGroup].budget;
      }
    }

    return { total, budget };
  }



  processBudgetData(input: { budget: any; year_weeks: any }) {

    // Remove duplicates from the year_weeks using the removeDuplicateWeeks function
    let year_data: any = this.removeDuplicateWeeks(input.year_weeks);


    // Initialize an array to store the results
    const results: { month: string; total: number; budget: number; diffrence: any }[] = [];

    // Iterate over the year_data to calculate monthly totals
    for (const monthKey in year_data) {
      const monthData = year_data[monthKey]; // Get the cleaned month data
      let monthlyTotal = 0;
      let monthlyBudget = 0;

      // Sum up the values for each week in the month
      for (const weekKey in monthData) {
        const week = monthData[weekKey];
        monthlyTotal += week.invoices;  // Add invoices for the week
        monthlyBudget += week.budget;  // Add budget for the week
      }

      // Calculate the difference
      const difference: any = monthlyTotal - parseFloat(monthlyBudget.toFixed(2));

      // Add the result to the results array
      results.push({
        month: monthKey,
        total: monthlyTotal,
        budget: parseFloat(monthlyBudget.toFixed(2)),
        diffrence: parseFloat(difference).toFixed(2),
      });
    }

    return results;
  }


  isLoadingBudgetbyID: boolean = true;
  semaines: any;
  databudgets: any;
  FetchBudgetbyIDMutation = injectMutation(() => ({
    mutationFn: (id: any) => this._Budgets.getById(id), // Récupérer les budgets pour une année spécifique
    onMutate: () => {
      this.isLoadingBudgetbyID = true; // Afficher un indicateur de chargement
    },
    onSuccess: (data: any) => {
      this.semaines = data
      this.databudgets = this.processBudgetData(this.semaines)
      this.GetInvoicesMonthsBudgetMutation.mutate()

      this.isLoadingBudgetbyID = false; // Masquer l'indicateur de chargement
      this.monthDataTotals = this.calculateTotal(this.removeDuplicateWeeks(data.year_weeks))

    },
    onError: () => {
      this.isLoadingBudgetbyID = false; // Masquer l'indicateur de chargement
      // this.message.error('Une erreur est survenue lors de la récupération des budgets.');
    },
  }));




  formData1: any[] = [];  // Array to hold form data
  isEditing: { [key: string]: boolean } = {};  // Track if a field is being edited
  editingData: { [key: string]: any } = {};  // Store the edited data temporarily
  editField(item: any, Field: string): void {
    this.isEditing[item.name] = true;

    // Initialize editingData for the item if it doesn't exist
    if (!this.editingData[item.name]) {
      this.editingData[item.name] = { name: item.name, amount: item.amount };
    }
  }
  selectedItemToEdit: any;

  saveField(item: any, field: string): void {
    const index = this.formData1.findIndex((data) => data.name === item.name);
    if (index !== -1) {
      // Update the item with edited data
      if (field === 'name') {
        this.formData1[index].name = this.editingData[item.name].name;
      } else if (field === 'amount') {
        this.formData1[index].amount = this.editingData[item.name].amount;
      }
    }
    this.selectedItemToEdit = this.formData1[index]

    this.EditBudgetMutation.mutate()
    this.isEditing[item.name] = false;
  }

  isLoading: boolean = false;
  formDataAdd = [
    { name: 'PETIT', amount: 0 },
    { name: 'MOYEN', amount: 0 },
    { name: 'GRAND', amount: 0 },
  ];



  onSubmitNewBudgets() {
    // Ensure all fields in formDataAdd have valid amounts
    const isFormComplete = this.formDataAdd.every((item) => item.amount > 0);

    if (isFormComplete) {

      if (this.budgets && Array.isArray(this.budgets.data)) {
        const namesToCheck = this.formDataAdd.map((item) => item.name);

        const hasAllNames = namesToCheck.every((name) =>
          this.budgets.data.some((budget: any) => budget.name === name)
        );

        if (hasAllNames) {
          // All names exist, proceed with editing the budgets
          this.EditBudgetsMutation.mutate();
        } else {
          // Missing names, proceed with adding new budgets
          const budgetData: any = this.formDataAdd.reduce(
            (acc, item) => ({ ...acc, [item.name]: item.amount }),
            { year: this.SelectedYear.getFullYear() }
          );

          this.AddbudgetsMutation.mutate(budgetData);
        }
      } else {
        // Handle invalid or missing budget data
      }
    } else {
      this.message.error('Veuillez remplir tous les champs');
    }
  }
  formData: any = {
    petit: '',
    moyen: '',
    grand: ''
  };


  AddbudgetsMutation = injectMutation(() => ({
    mutationFn: (formData: { petit: string; moyen: string; grand: string; year: any }) => {
      const year = formData.year; // Extract the year

      // Return a Promise that sends all requests in parallel
      return Promise.all(
        this.formDataAdd.map((data) => this._Budgets.create({ ...data, year: year })) // Call create for each budget type
      );
    },
    onMutate: () => {
      this.isLoading = true;
    },
    onSuccess: () => {
      this.isLoading = false;
      this.message.success("Les budgets sont effectués avec succès");
      this.isPopoverVisible = false;
      this.FetchBudgetsMutation.mutate(this.SelectedYear.getFullYear());
    },
    onError: (error: any) => {
      this.isLoading = false;
    },
  }));

  EditBudgetsMutation = injectMutation(() => ({
    mutationFn: () => {
      const updatedBudgets: any = [];

      // Iterate over the budget types (petit, moyen, grand) to check if they have changed
      ['petit', 'moyen', 'grand'].forEach((name) => {
        const currentBudget = this.budgets.data.find((budget: any) => budget.name === name);
        // Check if there is an existing budget and if the value has changed from this.formData
        if (currentBudget) {
          const currentAmount = currentBudget.amount;
          const newAmount = this.formData[name];  // Access the updated value directly from this.formData

          // Compare the current budget amount with the new value from this.formData
          if (newAmount !== '' && currentAmount !== newAmount) {
            updatedBudgets.push({
              id: currentBudget.id, // Get the existing budget id
              name,
              year: currentBudget.year,
              amount: newAmount, // New value
            });
          }
        }
      });

      // If there are updated budgets, send update requests for them
      if (updatedBudgets.length > 0) {
        return Promise.all(
          updatedBudgets.map((data: any) => this._Budgets.update(data.id, data)) // Call update for each changed budget type
        );
      } else {
        return Promise.resolve([]); // Return a resolved promise if no updates are needed
      }
    },
    onMutate: () => {
      this.isLoading = true;
    },
    onSuccess: (data: any[]) => {
      this.isLoading = false;
      this.message.success("Les budgets ont été mis à jour avec succès");
      this.isPopoverVisible = false;
      this.FetchBudgetsMutation.mutate(this.SelectedYear.getFullYear());
    },
    onError: (error: any) => {
      this.isLoading = false;
    },
  }));


  EditBudgetMutation = injectMutation(() => ({
    mutationFn: () => this._Budgets.update(this.selectedItemToEdit.id, { ...this.selectedItemToEdit, year: this.SelectedYear.getFullYear() }), // Update the specific budget
    onMutate: () => {
      this.isLoading = true;
    },
    onSuccess: (data: any) => {
      this.selectedItemToEdit = null;
      this.isLoading = false;
      this.message.success("Le budget a été mis à jour avec succès");
      this.FetchBudgetsMutation.mutate(this.SelectedYear.getFullYear());
    },
    onError: (error: any) => {
      this.isLoading = false;
    },
  }));


  FetchBudgetsMutation = injectMutation(() => ({
    mutationFn: (year: number) => this._Budgets.getAll({ year }), // Récupérer les budgets pour une année spécifique
    onMutate: () => {
      this.isLoadingBudgets = true; // Afficher un indicateur de chargement
    },
    onSuccess: (data: any) => {
      this.isLoadingBudgets = false; // Masquer l'indicateur de chargement
      this.budgets = data; // Stocker les budgets récupérés dans une variable locale


      const customOrder = ['PETIT', 'MOYEN', 'GRAND'];

      this.formData1 = data.data.map((item: { id: any; name: any; amount: any; }) => ({
        id: item.id,
        name: item.name,
        amount: item.amount
      })).sort((a: { name: string; }, b: { name: string; }) => customOrder.indexOf(a.name) - customOrder.indexOf(b.name));

      // Initialize editingData and isEditing with appropriate values
      this.formData1.forEach(item => {
        this.editingData[item.name] = { name: item.name, amount: item.amount };
        this.isEditing[item.name] = false;
      });

      // this.options = data.data.map( (item : any ) => item.name)

      if (this.budgets?.data.length > 0) {
        data.data.forEach((item: any) => {
          if (item.name  == 'PETIT') {
            this.SelectedBudget = item
            this.GetGraphData.mutate(item.id)
            this.FetchBudgetbyIDMutation.mutate(item.id)
          }
        })

      }

    },
    onError: (error: any) => {
      this.isLoadingBudgets = false; // Masquer l'indicateur de chargement
      // this.message.error('Une erreur est survenue lors de la récupération des budgets.');
    },
  }));


  months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  monthDataTotals: any;

  getTotalsInvoices() {
    return this.updateTotals(this.databudgets, this.FullMonthsInvocies).reduce(
      (acc: any, item: any) => {
        const budget = parseFloat(item.budget) || 0;
        const totalInvoices = parseFloat(item.total || '0') || 0;

        acc.totalBudget += budget;
        acc.totalInvoices += totalInvoices;
        acc.totalDifference += budget - totalInvoices;

        return acc;
      },

      { totalBudget: 0, totalInvoices: 0, totalDifference: 0 }
    );
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
    result.avgRatio = result.ratioCount > 0 ? result.ratioSum / result.ratioCount : 0;

    // Remove intermediate fields used for ratio calculation
    delete result.ratioSum;
    delete result.ratioCount;

    return result;
  }
  updateChartData() {
    // Extract data from GraphData
    const budgetData = this.databudgets?.map((item: { budget: any; }) =>
      parseFloat(item.budget) === 0 ? null : parseFloat(item.budget)
    );
    const result = Array(12).fill(0);
    this.InvoicesTotalsForEachMonth.forEach((item: any) => result[item.month - 1] = item.total);

    const invoiceData = result;


    // Ensure we have 12 months of data, filling missing months with 0 if necessary
    while (budgetData?.length < 12) {
      budgetData.push(0);
      invoiceData.push(0);
    }

    // Update chart options
    this.chartOptions4 = {
      series: [
        {
          name: "Prévision",
          data: budgetData,
          color: "#5DBF96" // Color for "Prévision"
        },
        {
          name: "Réel",
          data: invoiceData,
          color: "#2C52F5" // Color for "Reel"
        }
      ],
      chart: {
        type: "bar",
        height: 300,
        foreColor: "#7B8594", // Adjusts text color
        toolbar: {
          show: false
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "25px", // Specifies bar width in pixels
          borderRadius: 2, // Adjusts the corner radius of the bars
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 4,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"
        ],

      },
      yaxis: {
        min: 0, // Ensures the y-axis starts from 0
        logarithmic: true, // Remove logarithmic scale if not necessary
        labels: {
          formatter: function (value: any) {
            if (value >= 1000000) {
              return `${(value / 1000000).toFixed(2)}M€`; // Converts value to millions and appends €
            } else if (value >= 1000) {
              return `${(value / 1000).toFixed(2)}K€`; // Converts value to thousands and appends €
            }
            return `${value.toFixed(2)}€`; // Formats values below 1000
          },
        },
      },
      fill: {
        opacity: 0.8, // Adjusts the fill opacity for the bars
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return `${val.toFixed(2)}€`; // Formats values in tooltip
          }
        }
      },
      legend: {
        position: 'top', // Can be 'top', 'right', 'bottom', 'left'
        horizontalAlign: 'right', // Centers the legend horizontally
        floating: true, // Allows floating of the legend
        offsetY: 10, // Adjusts the vertical position of the legend
      },
    };



  }

  GetGraphData = injectMutation((client: any) => ({
    mutationFn: (budget_id: any) => this._GraphService.getAll({ budget_id: budget_id }),
    onMutate: () => {
      this.isLoadingGraph = true;
    },
    onSuccess: (data: any) => {
      this.isLoadingGraph = false;
      this.GraphData = data;

      this.totalsTable = this.calculateTotalsTable(data?.activities_data);
      this.MonthDataInvoices = this.getMonthDataInvoices()
      // this.updateChartData()
      client.invalidateQueries({ queryKey: ['graph'] });
    },
    onError: (error: any) => {
      this.isLoadingGraph = false;
    },
  }));

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
      "#6F4EA1",]
    const index = this.hashString(activity) % colors.length;
    return colors[index];
  }

  hashString(input: string): number {
    return Array.from(input).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  }

  OpenModalFilterDate() {
    this.isOpenModalFilterDate = true;
  }
  onChangeDateFilter(date: Date) {
    this.FilterDates = date.getFullYear();
    this.GetWorkHoursStatsMutation.mutate()

  }



  ComfirmModalFiltrage() {
    this.isSearchingWithDate = true;
    this.GetWorkHoursStatsMutation.mutate(undefined, {
      onSuccess: () => {
        this.isSearchingWithDate = false;
      },
      onError: (error) => {
        this.isSearchingWithDate = false;
        this.isOpenModalFilterDate = false;
        // this.setCurrentWeekDates();
        this.message.error('Problème lors du filtrage par date, veuillez réessayer');
      }
    });



  }

  handleCloseDateModal() {
    this.isOpenModalFilterDate = false;
    this.isSearchingWithDate = false;
    this.isOpenModalFilterDate = false;
    // this.setCurrentWeekDates();
    this.GetWorkHoursStatsMutation.mutate();
  }

  // GetInvoicesStatsMutation
  GetInvoicesStatsMutation = injectMutation((client: any) => ({
    mutationFn: ({ from = '', to = '' }: { from?: string; to?: string }) =>
      this._StatsService.GetInvoicesStats({ from, to }),
    onMutate: () => {
      this.isLoadingGetInvoicesStats = true;
    },
    onSuccess: (data: any) => {
      this.InvoicesStatsData = { labels: [], percentage: 0, data: [], total: 0 };

      this.InvoicesStatsDataServer = data;
      this.isLoadingGetInvoicesStats = false;
      this.InvoicesStatsData.percentage = this.calculatePercentageChange(data);
      data.forEach((item: any) => {
        this.InvoicesStatsData.data.push(parseFloat(item.total));
        this.InvoicesStatsData.labels.push(item.date);
        this.InvoicesStatsData.total += parseFloat(item.total);
      });
      this.chartOptions1 = {
        series: [
          {
            name: "",
            data: this.InvoicesStatsData.data,
          },
        ],
        chart: {
          type: "area",
          height: "120px",
          width: "100%",
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false, // Hide the download button
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
          colors: [
            this.InvoicesStatsData.percentage > 0
              ? "rgb(46,138,36)" // Green for positive
              : this.InvoicesStatsData.percentage < 0
                ? "rgb(255,0,0)" // Red for negative
                : "rgb(169,169,169)" // Gray for zero change
          ],
          width: 1,
        },
        fill: {
          colors: [
            this.InvoicesStatsData.percentage > 0
              ? "rgb(13,216,46)" // Green for positive
              : this.InvoicesStatsData.percentage < 0
                ? "rgb(255,102,102)" // Red for negative
                : "rgb(169,169,169)" // Gray for zero change
          ],
          type: "gradient",
        },
        tooltip: {
          x: {
            formatter: function (val: number) {
              return `${+val.toFixed(2)}€`; // Formats values below 1000
            }
          }
        },

        labels: this.InvoicesStatsData.labels,
        xaxis: {
          type: "datetime",
          labels: {
            show: false,
          },
        },
        yaxis: {
          opposite: true,
          labels: {
            show: false, // Hide right y-axis labels
          },
        },
        legend: {
          horizontalAlign: "left",
        },
        grid: {
          show: false, // Optionally hide the grid (bottom data)
        },

      };
      client.invalidateQueries({ queryKey: ['calendarStats'] });
    },
    onError: (error: any) => {
      this.isLoadingGetInvoicesStats = false;
    },
  }));


  normalizeData(data: any) {
    // Create a map for quick lookup of totals
    const dataMap = new Map(data.map((item: any) => [item.month, item.total]));

    // Generate a full 12-month dataset, filling missing months with total: 0
    return Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      total: dataMap.get(i + 1) || 0
    }));
  }



  updateTotals(originalData: any, newTotals: any) {
    // Create a map for quick lookup of new totals
    const totalMap = new Map(newTotals?.map((item: any) => [String(item.month), item.total]));

    // Update the original dataset with new totals and recalculate the difference
    return originalData?.map((item: any) => {
      const newTotal: any = totalMap.get(item.month) || 0;
      const newDifference = (newTotal - item.budget).toFixed(2); // Ensure 2 decimal places
      return { ...item, total: newTotal, diffrence: newDifference };
    });
  }

  getMonthlyData(data: any[]): any[] {
    // Initialize an array with 12 months, each with total set to 0
    const allMonths: any[] = Array.from({ length: 12 }, (_, i) => ({ month: i + 1, total: 0 }));

    // Update the months with the provided data
    data.forEach(entry => {
      const monthIndex = entry.month - 1;
      allMonths[monthIndex].total = entry.total;
    });

    return allMonths;
  }

  Difference: any;
  FullMonthsInvocies: any
  InvoicesTotalsForEachMonth: any;
  GetInvoicesMonthsBudgetMutation = injectMutation((client: any) => ({
    mutationFn: () => this._InvoicesService.getTotalsWithBudgetsForMonths({ all: true, year: this.SelectedYear.getFullYear() }),
    onMutate: () => {
      this.isLoadingGetInvoicesStats = true;
    },
    onSuccess: (data: any) => {

      const allMonths = Array.from({ length: 12 }, (_, i) => i + 1); // [1, 2, ..., 12]
      this.InvoicesTotalsForEachMonth = data;

      this.InvoicesTotalsForEachMonth = allMonths.map(month => {
        const found = data.find((item: { month: number; }) => item.month === month);
        return {
          month,
          total: found ? found.total : 0
        };
      });
      const countMonthsWithTotal = this.InvoicesTotalsForEachMonth.filter((m: { total: number; }) => m.total > 0).length;


      this.FullMonthsInvocies = this.normalizeData(data)
      this.isLoadingGetInvoicesStats = false;

      this.average = data.reduce((sum: any, item: any) => sum + item.total, 0) / countMonthsWithTotal;

      this.Difference = this.updateTotals(this.databudgets, this.FullMonthsInvocies);


      this.updateChartData()

    },
    onError: (error: any) => {
      this.isLoadingGetInvoicesStats = false;
    },
  }));


  // GetInvoicesStatsMutation
  GetClientsStatsMutation = injectMutation((client: any) => ({
    mutationFn: ({ from = '', to = '' }: { from?: string; to?: string }) =>
      this._StatsService.GetClientsStats({ from, to }),
    onMutate: () => {
      this.isLoadingGetClientsStats = true;
    },
    onSuccess: (data: any) => {
      this.GetClientsStatsData = { labels: [], percentage: 0, data: [], total: 0 };

      this.clientStatsData = data;
      this.isLoadingGetClientsStats = false;
      this.GetClientsStatsData.percentage = this.calculatePercentageChange1(data);
      data.forEach((item: any) => {
        this.GetClientsStatsData.data.push(parseFloat(item.count));
        this.GetClientsStatsData.labels.push(item.date);
        this.GetClientsStatsData.total += parseFloat(item.count);
      });

      this.chartOptions3 = {
        series: [
          {
            name: "",
            data: this.GetClientsStatsData.data,
          },
        ],
        chart: {
          type: "area",
          height: "120px",
          width: "100%",
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false, // Hide the download button
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
          colors: [
            this.GetClientsStatsData.percentage > 0
              ? "rgb(46,138,36)" // Green for positive
              : this.GetClientsStatsData.percentage < 0
                ? "rgb(255,0,0)" // Red for negative
                : "rgb(169,169,169)" // Gray for zero change
          ],
          width: 1,
        },
        fill: {
          colors: [
            this.GetClientsStatsData.percentage > 0
              ? "rgb(13,216,46)" // Green for positive
              : this.GetClientsStatsData.percentage < 0
                ? "rgb(255,102,102)" // Red for negative
                : "rgb(169,169,169)" // Gray for zero change
          ],
          type: "gradient",
        },

        labels: this.GetClientsStatsData.labels,
        xaxis: {
          type: "datetime",
          labels: {
            show: false,
          },
        },
        yaxis: {
          opposite: true,
          labels: {
            show: false, // Hide right y-axis labels
          },
        },
        legend: {
          horizontalAlign: "left",
        },
        grid: {
          show: false, // Optionally hide the grid (bottom data)
        },
      };

      client.invalidateQueries({ queryKey: ['calendarStats'] });
    },
    onError: (error: any) => {
      this.isLoadingGetClientsStats = false;
    },
  }));


  // GetUnpaidInvoicesStatsMutation
  GetUnpaidInvoicesStatsMutation = injectMutation((client: any) => ({
    mutationFn: () => this._StatsService.GetUnpaidInvoicesStats({}),
    onMutate: () => {
      this.isLoadingGetUnpaidInvoicesStats = true;
    },
    onSuccess: (data: any) => {
      this.isLoadingGetUnpaidInvoicesStats = false;

      // Reset stats to ensure no previous data is carried over
      this.UnpaidInvoicesStats = {
        percentage: 0,
        data: [],
        labels: [],
        total: 0,
      };

      // Calculate stats based on the new data structure
      this.UnpaidInvoicesStats.percentage = this.calculatePercentageChange(data);
      data.forEach((item: any) => {
        const unpaidAmount = parseFloat(item.total);
        this.UnpaidInvoicesStats.data.push(unpaidAmount);
        this.UnpaidInvoicesStats.labels.push(item.date);
        this.UnpaidInvoicesStats.total += unpaidAmount;
      });

      client.invalidateQueries({ queryKey: ['calendarStats'] });
    },
    onError: (error: any) => {
      this.isLoadingGetUnpaidInvoicesStats = false;
    },

  }));





  budgetValues: any = {
    budget30K: 30000,
    budget40K: 40000,
    budget45K: 45000,
    budget60K: 60000
  };


  editBudget(key: string): void {
    this.isEditing[key] = true;
  }

  saveBudget(key: string): void {
    this.isEditing[key] = false;
    this.updateLocalStorage();
  }
  updateLocalStorage(): void {
    // Save the updated budget values to local storage
    localStorage.setItem('budgetValues', JSON.stringify(this.budgetValues));
  }



  workedHoursData: any[] = [];

  // GetWorkHoursStatsMutation
  GetWorkHoursStatsMutation = injectMutation((client: any) => ({
    mutationFn: () => this._StatsService.GetWorkHoursStats({ from: this.SelectedYear.getFullYear() + "-1-1", to: this.SelectedYear.getFullYear() + "-12-30" }),
    onMutate: () => {
      this.isLoadingGetWorkHoursStats = true;
    },
    onSuccess: (data: any) => {
      this.workedHoursData = data;
      // Sample data from the server
      const serverData = data.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

      // Step 1: Group data by month and calculate totals
      const groupByMonth = (data: any[]) => {
        const grouped: { [key: string]: { hours: number; total: number } } = {};

        data.forEach(({ date, hours, total }) => {
          const monthYear = new Date(date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long"
          });

          if (!grouped[monthYear]) {
            grouped[monthYear] = { hours: 0, total: 0 };
          }
          grouped[monthYear].hours += hours;
          grouped[monthYear].total += total;
        });

        return grouped;
      };

      const groupedData = groupByMonth(serverData);

      // Step 2: Extract data for chart options
      const categories = Object.keys(groupedData); // Extract month-year names
      const hoursData = Object.values(groupedData).map((item) => item.hours); // Total hours per month
      const totalsData = Object.values(groupedData).map((item) => item.total); // Total earnings per month

      // Step 3: Update chart options dynamically
      this.chartOptionsWorkdedHours = {
        series: [
          {
            name: "Heures travaillées",
            data: hoursData // Your actual data
          }
        ],
        chart: {
          height: 350,
          type: "bar",
          locale: 'fr', // Set locale to French
          toolbar: {
            show: false,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: true,
            },
            export: {
              svg: {
                filename: 'heures-travaillees',
              },
              png: {
                filename: 'heures-travaillees',
              }
            },
            autoSelected: 'zoom'
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "20px",
            borderRadius: 4
          }
        },
        colors: ["#2c52f5"],
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        grid: {
          show: false
        },
        xaxis: {
          categories, // Your dynamic categories (e.g., month-year)
          labels: {
            rotate: -45,
            style: {
              fontSize: "12px",
              fontFamily: "Arial, sans-serif"
            }
          },
          title: {
            style: {
              fontWeight: "bold",
              fontSize: "14px"
            }
          }
        },
        tooltip: {
          enabled: true,
          shared: false,
          custom: ({ seriesIndex, dataPointIndex, w }: { seriesIndex: number; dataPointIndex: number; w: any }) => {
            const monthName = w.config.xaxis.categories[dataPointIndex];
            const hours = w.config.series[seriesIndex].data[dataPointIndex];
            const montant = totalsData[dataPointIndex];

            return `
        <div class="p-1 px-3 bg-black text-white">
          <strong>${monthName}</strong><br>
          ${hours}h travaillées<br>
          Totals : ${montant}€
        </div>
      `;
          }
        }
      };


      this.isLoadingGetWorkHoursStats = false;



      client.invalidateQueries({ queryKey: ['calendarStats'] });
    },
    onError: (error: any) => {
      this.isLoadingGetWorkHoursStats = false;
    },
  }));





  // GetLastPaymentsStatsMutation
  GetLastPaymentsStatsMutation = injectMutation((client: any) => ({
    mutationFn: () => this._StatsService.GetLastPaymentsStats({}),
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

  // GetLastUnpaidClientsStatsMutation
  GetLastUnpaidClientsStatsMutation = injectMutation((client: any) => ({
    mutationFn: () => this._StatsService.GetLastUnpaidClientsStats({}),
    onMutate: () => {
      this.isLoadingGetLastUnpaidClientsStats = true;
    },
    onSuccess: (data: any) => {
      this.isLoadingGetLastUnpaidClientsStats = false;
      this.LastUnpaidClientsData = data;
      client.invalidateQueries({ queryKey: ['calendarStats'] });
    },
    onError: (error: any) => {
      this.isLoadingGetLastUnpaidClientsStats = false;
    },
  }));
  isOpenModalFilterDate: boolean = false;

  calculatePercentageChange(data: { date: string, total: string }[]): number {

    if (data.length < 2) {
      return 0;
    }

    const previousAmount = parseFloat(data[data.length - 2].total); // Second last unpaid amount
    const currentAmount = parseFloat(data[data.length - 1].total);  // Last unpaid amount

    if (previousAmount === 0) {
      return 0; // To avoid division by zero
    }

    const percentageChange = ((currentAmount - previousAmount) / previousAmount) * 100;

    return parseFloat(percentageChange.toFixed(2)); // Return the percentage change
  }


  calculatePercentageChange1(data: { date: string, count: number }[]): number | null {
    if (data.length < 2) {
      return null; // Cannot calculate percentage change with less than 2 data points
    }

    const previousTotal = data[data.length - 2].count; // Second last total
    const currentTotal = data[data.length - 1].count;  // Last total

    // Handle the case where the previous count is zero
    if (previousTotal === 0) {
      return currentTotal > 0 ? 100 : 0; // Special case for when the previous count is 0
    }

    // Calculate the percentage change
    const percentageChange = ((currentTotal - previousTotal) / previousTotal) * 100;

    return parseFloat(percentageChange.toFixed(2)); // Return the percentage change rounded to 2 decimal places
  }

  isPopoverFilterTotalRevenuVisible: boolean = false;
  isPopoverFilterClientVisible: boolean = false;
  resetFilterTotalClient() {
    const startDate: any = this.startDateClient
      ? formatDate(this.startDateClient, 'yyyy-MM-dd', 'en-US')
      : null;

    const endDate: any = this.endDateClient
      ? formatDate(this.endDateClient, 'yyyy-MM-dd', 'en-US')
      : null;
    if (startDate && endDate) {
      this.startDateClient = null;
      this.endDateClient = null;
      this.GetClientsStatsMutation.mutate({ from: '', to: '' })

    }
    this.isPopoverFilterClientVisible = false;
  }
  applyFilterTotalClient() {


    const startDate: any = this.startDateClient
      ? formatDate(this.startDateClient, 'yyyy-MM-dd', 'en-US')
      : null;

    const endDate: any = this.endDateClient
      ? formatDate(this.endDateClient, 'yyyy-MM-dd', 'en-US')
      : null;

    if (startDate && endDate) {
      this.GetClientsStatsMutation.mutate({ from: startDate, to: endDate })
      this.isPopoverFilterClientVisible = false;
    }

  }


  applyFilterTotalRevenu() {
    const startDate: any = this.startDateTotalRevenu
      ? formatDate(this.startDateTotalRevenu, 'yyyy-MM-dd', 'en-US')
      : null;

    const endDate: any = this.endDateTotalRevenu
      ? formatDate(this.endDateTotalRevenu, 'yyyy-MM-dd', 'en-US')
      : null;

    if (startDate && endDate) {
      this.GetInvoicesStatsMutation.mutate({ from: startDate, to: endDate })
      this.isPopoverFilterTotalRevenuVisible = false;
    }
  }

  resetFilterTotalRevenu() {

    const startDate: any = this.startDateTotalRevenu
      ? formatDate(this.startDateTotalRevenu, 'yyyy-MM-dd', 'en-US')
      : null;

    const endDate: any = this.endDateTotalRevenu
      ? formatDate(this.endDateTotalRevenu, 'yyyy-MM-dd', 'en-US')
      : null;

    if (startDate && endDate) {
      this.startDateTotalRevenu = null;
      this.endDateTotalRevenu = null;
      this.GetInvoicesStatsMutation.mutate({ from: '', to: '' })

    }


    this.isPopoverFilterTotalRevenuVisible = false;

  }


  changePopoverFilterTotalRevenu($event: boolean) {

  }
  PayLoading = false;
  selected_Invoice: any;
  PayModalOpen: boolean = false;
  PayClient(client: any) {
    this.selected_Invoice = client;
    this.PayModalOpen = true;
  }

  HandleCancelPaymentModal() {
    this.PayModalOpen = false;
  }


  addPaymentMutation = injectMutation(() => ({
    mutationFn: (data: any) => this._Payments.createPaymentInvoices(data),
    onSuccess: () => {
      this.PayModalOpen = false;
      this.GetLastUnpaidClientsStatsMutation.mutate()

      this.message.success("Le paiement a été ajouté avec succès !"); // Cas de succès
      this.PayLoading = true;

    },
    onError: (error: any) => {
      this.PayLoading = false;
      this.message.error("Échec de l'ajout du paiement : " + error.message); // Cas d'erreur
    },
    onSettled: () => {
      // Cela s'exécute que la mutation réussisse ou échoue
      this.PayLoading = false;
    }
  }));

  isLoadingInvoicesDetails: boolean = false;
  fetchInvoicesByIdData = injectMutation(() => ({
    mutationFn: (id: number) => this._InvoicesService.getById(id), // Récupérer les budgets pour une année spécifique
    onMutate: () => {
      this.isLoadingInvoicesDetails = true; // Afficher un indicateur de chargement
    },
    onSuccess: (data: any) => {
      this.isLoadingInvoicesDetails = false; // Masquer l'indicateur de chargement
      this.addPaymentMutation.mutate({ invoice_id: data.invoice_days[0].id, amount: data.total })
    },
    onError: (error: any) => {
      this.isLoadingInvoicesDetails = false; // Masquer l'indicateur de chargement
    },
  }));


  comfirmPayment() {
    this.addPaymentMutation.mutate({ invoice_id: this.selected_Invoice.invoice_id, amount: this.selected_Invoice.unpaid_amount })
  }
}
