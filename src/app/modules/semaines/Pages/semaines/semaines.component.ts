import { Component, ViewChild } from '@angular/core';
import { PageTemplateComponent } from "../../../../layouts/page-template/page-template.component";
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { RouterModule } from '@angular/router';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { WeeksComparisonService } from '../../../../data/services/weeksComparison/weeks-comparison.service';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { BudgetsService } from '../../../../data/services/budgets/budgets.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { ShortenNumberPipe } from "../../../../shared/pipes/shortenNumber/shorten-number.pipe";
import { VacationWeeksService } from '../../../../data/services/vacation_weeks/vacation-weeks.service';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { VacationComponent } from "../../../vacation/vacation/Pages/vacation/vacation.component";
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { InvoicesService } from '../../../../data/services/invoices/invoices.service';


@Component({
  selector: 'app-semaines',
  standalone: true,
  imports: [PageTemplateComponent, NzModalModule, TranslatePipe, NzEmptyModule, NzTabsModule, NzToolTipModule, NzBreadCrumbModule, NzSegmentedModule, CommonModule, NzButtonModule, RouterModule, NzDatePickerModule, NzPopoverModule, ReactiveFormsModule, FormsModule, ShortenNumberPipe],
  templateUrl: './semaines.component.html',
  styleUrl: './semaines.component.css'
})
export class SemainesComponent {
  IsAddVacationModalOpen: any;
  ArraySelectedWeeks: number[] = [];
  IsAdding: boolean = false;
  DelteUserMutation = injectMutation((client: any) => ({
    mutationFn: (data: any) => this._VacationService.delete(data),
    onMutate: () => {
      this.IsAdding = true;
      this.message.success("Vacance supprimées avec succès");

      this.FetchBudgetsMutation.mutate(this.SelectedYear.getFullYear())

    },
    onSuccess: () => {
      this.IsAdding = false;
      this.ShowDeleteModal = false;
    },
    onError: () => {
      this.IsAdding = false;
    }
  }));





  SelectedWeek: any;
  HandleComfirmDeleteModal() {
    if (this.SelectedWeek) {
      let weekID = this.vacationsData.find((e: any) => e.week === this.SelectedWeek)?.id;
      this.DelteUserMutation.mutate(weekID)
    }
  }
  handleCancelDeleteModal() {
    this.SelectedWeek = null;
    this.ShowDeleteModal = false;
  }

  ShowDeleteModal: boolean = false;
  showDeleteModal(week: number) {
    this.ShowDeleteModal = true;
    this.SelectedWeek = Number(week);
  }


  addVacationMutation = injectMutation((client: any) => ({
    mutationFn: (data: any) => this._VacationService.create(data),
    onMutate: () => {
      this.IsAdding = true;

    },
    onSuccess: () => {
      this.IsAdding = false;
      this.IsAddVacationModalOpen = false;
      this.message.success("Vacance ajoutées avec succès");
      this.FetchBudgetsMutation.mutate(this.SelectedYear.getFullYear())
      this.fetchVacationWeeks.mutate()

    },
    onError: () => {
      this.IsAdding = false;
    }
  }));

  comfirmVacationAdd() {
    if (this.SelectedWeek && this.SelectedYear) {
      this.addVacationMutation.mutate(
        {
          year: this.SelectedYear.getFullYear(),
          week: Number(this.SelectedWeek)
        }
      )
    }

  }



  InvoicesByYear: any;
  getInvoiceTotalForWeek(month: any, week: any) {
    // Validate month input (1-12)
    let year = this.SelectedYear.getFullYear();
    month = Number(month)
    if (month < 1 || month > 12) {
      throw new Error("Month must be between 1 and 12.");
    }

    // Get the start date of the given ISO week
    const startDate = this.getDateOfISOWeek(week, year);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6); // End of the week

    // Ensure the week falls within the specified month
    if (startDate.getMonth() + 1 !== month && endDate.getMonth() + 1 !== month) {
      return 0; // No overlap with the specified month
    }

    let invoiceTotal = 0;

    // Loop through the data and check if the date falls within the week and month
    this.InvoicesByYear.forEach((entry: any) => {
      const entryDate = new Date(entry.date.split("-").reverse().join("-"));
      if (
        entryDate >= startDate &&
        entryDate <= endDate &&
        entryDate.getMonth() + 1 === month
      ) {
        invoiceTotal += entry.invoices;
      }
    });

    return invoiceTotal;
  }

  // Helper function to get the start date of a given ISO week
  getDateOfISOWeek(week: any, year: any) {
    const simple = new Date(year, 0, 1 + (week - 1) * 7);
    const dow = simple.getDay();
    const ISOWeekStart = simple;
    if (dow <= 4) {
      ISOWeekStart.setDate(simple.getDate() - simple.getDay() + 1);
    } else {
      ISOWeekStart.setDate(simple.getDate() + 8 - simple.getDay());
    }
    return ISOWeekStart;
  }


  HandleCancelVacationModal() {
    this.IsAddVacationModalOpen = false
  }

  OpenDeletevacationModal(Week: any) {
    this.showDeleteModal(Number(Week))

  }

  OpenAddvacationModal(Week: any) {
    this.SelectedWeek = Week;
    this.IsAddVacationModalOpen = true
  }
  OpenPageWeek() {
    this.currentYear = new Date();
    this.SelectedYear = this.currentYear;
    this.FetchBudgetsMutation.mutate(this.SelectedYear.getFullYear())
  }

  isLoading: boolean = true;
  data: any;
  currentYear!: Date;
  SelectedYear: Date = new Date();


  formData1: any[] = [];  // Array to hold form data
  isEditing: { [key: string]: boolean } = {};  // Track if a field is being edited
  editingData: { [key: string]: any } = {};  // Store the edited data temporarily

  editField(item: any, field: string): void {
    this.isEditing[item.name] = true;

    // Initialize editingData for the item if it doesn't exist
    if (!this.editingData[item.name]) {
      this.editingData[item.name] = { name: item.name, amount: item.amount };
    }
  }

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


  months = [
    { id: 1, name: 'Janvier' },
    { id: 2, name: 'Février' },
    { id: 3, name: 'Mars' },
    { id: 4, name: 'Avril' },
    { id: 5, name: 'Mai' },
    { id: 6, name: 'Juin' },
    { id: 7, name: 'Juillet' },
    { id: 8, name: 'Août' },
    { id: 9, name: 'Septembre' },
    { id: 10, name: 'Octobre' },
    { id: 11, name: 'Novembre' },
    { id: 12, name: 'Décembre' },
  ];

  weeks = [1, 2, 3, 4];
  isPopoverVisible: boolean = false;
  dateBudget: any;
  budgets: any;
  SelectedBudgetData: any;
  budgetforRest!: number;

  constructor(private _InvoicesService: InvoicesService, private _VacationService: VacationWeeksService, private translate: TranslateService, private _VacationSergice: VacationWeeksService, private _WeeksComparisonService: WeeksComparisonService, private _Budgets: BudgetsService, private message: NzMessageService) {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('fr');
    this.currentYear = new Date();
    this.SelectedYear = this.currentYear;
    this.FetchBudgetsMutation.mutate(this.SelectedYear.getFullYear())


  }

  invocesloading: boolean = false
  GetInvoicesByYearMutation = injectMutation(() => ({
    mutationFn: () => this._InvoicesService.getInvoicesbyYear({ year: this.SelectedYear.getFullYear() }),
    onMutate: () => {
      this.invocesloading = true;
    },
    onSuccess: (data: any) => {
      this.invocesloading = false;
      this.InvoicesByYear = data;
    },
    onError: (err: any) => {
      this.invocesloading = false;
      this.message.error('Error, please try again.');
    },
  }));


  options = ['PETIT', 'MOYEN', 'GRAND'];
  Recapitulatif: any;

  calculateRecapitulatif(data: any[]) {
    const totals = data.reduce(
      (acc: { totalObjectif: number; totalMontantRestant: number; totalSemaineRestant: number; totalInvoices: number; }, item: { budget: string; invoice_total: number; invoice_week: number; }) => {
        const budget = parseFloat(item.budget);
        const montantRestant = budget - item.invoice_total;
        const semaineRestant = 52 - item.invoice_week;

        acc.totalObjectif += budget;
        acc.totalMontantRestant += montantRestant;
        acc.totalSemaineRestant += semaineRestant;

        // Add the invoice_total to the totalInvoices
        acc.totalInvoices += item.invoice_total;

        return acc;
      },
      { totalObjectif: 0, totalMontantRestant: 0, totalSemaineRestant: 0, totalInvoices: 0 }
    );

    // Calculate averages
    const averageSemaineRestant = (totals.totalSemaineRestant / data.length).toFixed(2);

    return {
      totalInvoices: totals.totalInvoices.toFixed(2), // Only return totalInvoices
      totalObjectif: totals.totalObjectif.toFixed(2),
      totalMontantRestant: totals.totalMontantRestant.toFixed(2),
      averageSemaineRestant: parseFloat(averageSemaineRestant)
    };
  }

  // calculateTotal(monthId: string, type: "TotalInvoices" | "Budgets"): number {
  //   const monthData = this.data1[monthId];
  //   if (!monthData) {
  //     throw new Error("Invalid monthId");
  //   }

  //   let total = 0;

  //   monthData.forEach((invoice: any) => {
  //     // Skip if is_vacation is true
  //     if (invoice.is_vacation) {
  //       return;
  //     }

  //     if (type === "TotalInvoices") {
  //       total += invoice.invoice_total;
  //     } else if (type === "Budgets") {
  //       total += parseFloat(invoice.budget.toString());
  //     }
  //   });

  //   return total;
  // }
  calculateTotal(month: string, type: string): number {
    let total = 0;
    this.semaines.forEach((sem: { month: string; weeks: any[]; }) => {
      if (sem.month === month) {
        sem.weeks.forEach((week: { data: { budget: number; invoices: number; }; }) => {
          if (type === 'Budgets') {
            total += week.data.budget;
          } else if (type === 'TotalInvoices') {
            total += week.data.invoices;
          }
        });
      }
    });
    return total;
  }




  handleValueChange(e: number): void {
    this.selectedValueSeg = e;
    if (!this.budgets.data.length) {
      this.message.info("Les budgets actuels sont vides. Veuillez vérifier et remplir les budgets manquants afin de procéder correctement.")

    } else {
      const petitEntries = this.budgets.data.filter((item: any) => item.name === this.options[e]);
      let lastidbudget = petitEntries[petitEntries.length - 1].id
      this.SelectedBudgetData = petitEntries[petitEntries.length - 1]
      this.fetchVacationWeeks.mutate()
      // this.WeeksComparisonMutation.mutate(petitEntries[petitEntries.length - 1].id)
    }

  }

  formData: any = {
    petit: '',
    moyen: '',
    grand: ''
  };



  formDataAdd = [
    { name: 'PETIT', amount: 0 },
    { name: 'MOYEN', amount: 0 },
    { name: 'GRAND', amount: 0 },
  ];



  onSubmitNewBudgets() {
    // Ensure all fields in formDataAdd have valid amounts
    const isFormComplete = this.formDataAdd.every((item) => item.amount > 0);

    if (isFormComplete) {
      const year = new Date(this.dateBudget).getFullYear();

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


  change(visible: boolean): void {
    this.isPopoverVisible = visible;  // Handles the visibility change
  }

  getMonthlyDifference(monthId: number): number {
    const totalBudget = this.data
      .filter((item: { invoice_month: number; budget: string }) => item.invoice_month === monthId)
      .reduce((sum: number, item: { budget: any; }) => sum + parseFloat(item.budget || "0"), 0);

    const totalInvoices = this.data
      .filter((item: { invoice_month: number; invoice_total: number }) => item.invoice_month === monthId)
      .reduce((sum: any, item: { invoice_total: any; }) => sum + (item.invoice_total || 0), 0);

    return totalBudget - totalInvoices;
  }

  getBudgetTotalForWeek(monthId: number, week: number): number {
    const entry = this.data.filter(
      (item: { invoice_month: number; invoice_week: number; budget: string }) =>
        item.invoice_month === monthId && item.invoice_week === week
    );

    return entry.reduce((sum: number, item: { budget: any; }) => sum + parseFloat(item.budget || "0"), 0);
  }


  getMonthlyInvoiceTotal(monthId: number): number {
    return this.data
      .filter((item: { invoice_month: number; }) => item.invoice_month === monthId)
      .reduce((sum: any, item: { invoice_total: any; }) => sum + (item.invoice_total || 0), 0);
  }


  getFullWeeksForEachMonth(year: number): number[] {
    // Function to determine if the given year is a leap year
    const isLeapYear = (year: number): boolean => {
      return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    };

    // Determine if the year is a leap year
    const leapYear = isLeapYear(year);

    // Days in each month
    const monthsDays = [
      31, // January
      leapYear ? 29 : 28, // February
      31, // March
      30, // April
      31, // May
      30, // June
      31, // July
      31, // August
      30, // September
      31, // October
      30, // November
      31  // December
    ];

    // Calculate weeks for each month
    const fullWeeksForMonth = monthsDays.map(days => {
      const fullWeeks = Math.floor(days / 7);
      const hasLeftoverDays = days % 7 > 0; // Check for leftover days
      return hasLeftoverDays ? fullWeeks + 1 : fullWeeks;
    });

    return fullWeeksForMonth;
  }




  getMonthAndWeek(weekNumber: any) {
    // Calculate the month (1-indexed)
    const month = Math.ceil(weekNumber / 4);
    // Calculate the week within the month (1-indexed)
    const monthWeek = weekNumber % 4 === 0 ? 4 : weekNumber % 4;
    return {
      month,
      monthWeek,
    };
  }

  // Function to fill the missing weeks for each month
  fillOtherMonths(input: any[], _isLeapYear: boolean = false): any[] {
    const result = [];
    const weeksPerMonth = this.getFullWeeksForEachMonth(this.SelectedYear.getFullYear()); // Get number of weeks for each month
    let weekindex = 1; // Starting week index

    // Create an array for each month (1 to 12)
    for (let month = 1; month <= 12; month++) {
      const monthData = input.filter((item: { invoice_month: number; }) => item.invoice_month === month);
      // Get the number of weeks for this month
      const numWeeks = weeksPerMonth[month - 1]; // months are 1-indexed, array is 0-indexed

      // Iterate over the number of weeks for this month
      for (let week = 1; week <= numWeeks; week++) {
        // Find the week data for the specific week
        const weekData = monthData.find((item: { invoice_week: number; }) => item.invoice_week === weekindex);

        // Check if the current week is part of the vacation data
        const isVacation = this.vacationsData.some((vacation: { year: string; week: number; }) => +vacation.year === this.SelectedYear.getFullYear() && vacation.week === weekindex);

        // If week data exists, push it to the result array with vacation status and week index
        if (weekData) {
          result.push({
            ...weekData,
            is_vacation: isVacation,
            invoice_week: week,
            indexweek: weekindex
          });
        } else {
          // If no data for a specific week, create an entry with 0 invoice_total and vacation flag
          result.push({
            invoice_month: month,
            invoice_month_index: null, // Placeholder as there is no month data
            invoice_week: week,
            indexweek: weekindex,
            invoice_total: 0,
            week_id: weekData ? weekData.invoice_week : null,
            budget: this.budgetforRest,
            is_vacation: isVacation
          });
        }

        // Increment the cumulative week index
        weekindex++;
      }
    }

    return result;
  }




  groupByMonth(input: any[]) {
    return input.reduce((acc: { [x: string]: any[]; }, curr: { invoice_month: string | number; }) => {
      // If the month doesn't exist in the accumulator, create it
      if (!acc[curr.invoice_month]) {
        acc[curr.invoice_month] = [];
      }
      // Push the current invoice data to the corresponding month
      acc[curr.invoice_month].push(curr);
      return acc;
    }, {});
  }
  data1: any;

  getMonthNameInFrench(month: number): string {
    const monthsInFrench = [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    // Ensure the month is between 1 and 12
    if (month < 1 || month > 12) {
      return "Mois invalide";
    }

    return monthsInFrench[month - 1];
  }

  keysMonths: any;
  WeeksComparisonMutation = injectMutation((client: any) => ({
    mutationFn: (budget_id: any) =>
      this._WeeksComparisonService.getAll({ all: true, year: this.SelectedYear.getFullYear(), budget_id: budget_id })
        .then((response) => {
          // Group and sum logic
          const groupedData = response.reduce((acc: any, current: any) => {
            const key = `${current.invoice_month}-${current.invoice_week}`;

            if (!acc[key]) {
              acc[key] = {
                invoice_month: current.invoice_month,
                invoice_week: current.invoice_week,
                invoice_total: 0,
                budget: 0
              };
            }

            acc[key].invoice_total += current.invoice_total;
            acc[key].budget += parseFloat(current.budget);

            return acc;
          }, {});

          // Convert grouped data back to an array
          return Object.values(groupedData);
        }),
    onMutate: () => {
      this.isLoading = true;
    },
    onSuccess: (data: any) => {
      this.isLoading = false;
      this.data = data;
      this.data1 = this.groupByMonth(this.fillOtherMonths(data))
      this.keysMonths = Object.keys(this.groupByMonth(this.fillOtherMonths(data)))
      this.Recapitulatif = this.calculateRecapitulatif(this.data)
      client.invalidateQueries({ queryKey: ['WeeksComparison'] });
    },
    onError: (error: any) => {
      this.isLoading = false;
    },
  }));
  semaineRest: any;
  selectedValueSeg: any;
  vacationsData: any;






  getSemaineRest(): number {
    let remainingWeeks = 0;
    this.semaines.forEach((sem: { weeks: any[]; }) => {
      sem.weeks.forEach((week: { data: { invoices: number; budget: number; }; }) => {
        if (week.data.invoices < week.data.budget) {
          remainingWeeks++;
        }
      });
    });
    return remainingWeeks;
  }
  mergeVacationsWithBudget(
    budgetData: { year_weeks: { [x: string]: any } },
    vacationsData: any[]
  ) {
    // Filter vacations for the selected year
    const filteredVacations = vacationsData.filter(
      vacation => +vacation.year === this.SelectedYear.getFullYear()
    );

    // Create an array of vacation weeks
    const vacationWeeks = filteredVacations.map(vacation =>
      vacation.week.toString().padStart(2, '0')
    );

    // Merge year_weeks with vacation flag, sorting only for month 3
    const mergedData = Object.keys(budgetData.year_weeks).map(month => {
      const weeks = budgetData.year_weeks[month];

      const mergedWeeks = Object.keys(weeks)
        .sort((a, b) => (month === "3" ? +a - +b : 0)) // Sort weeks numerically for month 3
        .map(week => {
          const weekData = weeks[week];
          const isVacation = vacationWeeks.includes(week); // Check if the week is a vacation
          return {
            week,
            data: { ...weekData, is_vacation: isVacation }
          };
        });

      return {
        month,
        weeks: mergedWeeks
      };
    });

    return mergedData;
  }




  fetchVacationWeeks = injectMutation((client: any) => ({
    mutationFn: () => this._VacationSergice.getAll({ all: true, year: this.SelectedYear.getFullYear() }),
    onMutate: () => {
      this.isLoading = true;
    },
    onSuccess: (data: any) => {
      this.WeeksComparisonMutation.mutate(this.SelectedBudgetData.id)
      this.FetchBudgetbyIDMutation.mutate(this.SelectedBudgetData.id)
      this.isLoading = false;
      this.vacationsData = data.data;
      this.budgetforRest = this.SelectedBudgetData.amount / (52 - data.data.length)
    },
    onError: (error: any) => {
      this.isLoading = false;
    },
  }));


  EditBudgetsMutation = injectMutation((client: any) => ({
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
  selectedItemToEdit: any;
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






  AddbudgetsMutation = injectMutation((client: any) => ({
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
    onSuccess: (data: any[]) => {
      this.isLoading = false;
      this.message.success("Les budgets sont effectués avec succès");
      this.isPopoverVisible = false;
      this.FetchBudgetsMutation.mutate(this.SelectedYear.getFullYear());
    },
    onError: (error: any) => {
      this.isLoading = false;
    },
  }));
  FetchBudgetsMutation = injectMutation(() => ({
    mutationFn: (year: number) => this._Budgets.getAll({ year }), // Récupérer les budgets pour une année spécifique
    onMutate: () => {
      this.isLoading = true; // Afficher un indicateur de chargement
    },
    onSuccess: (data: any) => {
      this.GetInvoicesByYearMutation.mutate()
      this.isLoading = false; // Masquer l'indicateur de chargement
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
      // this.options = this.formData1.map( (item : any ) => item.name)


      if (!this.budgets.data.length) {
        this.message.info("Les budgets actuels sont vides. Veuillez vérifier et remplir les budgets manquants afin de procéder correctement.")
      } else {
        data.data.forEach((item: any) => {
          if (item.name  == 'PETIT') {
            this.SelectedBudgetData = item
          }
        })
        this.selectedValueSeg = 0;
        this.fetchVacationWeeks.mutate()



      }


      // Assuming `data.data` is the response data array
      this.formData = {
        petit: '',
        moyen: '',
        grand: ''
      };
      data.data.forEach((item: any) => {
        if (item.name in this.formData) {
          this.formData[item.name] = item.amount.toString(); // Convert amount to string and assign to formData
          this.formData[item.id] = item.id.toString(); // Convert amount to string and assign to formData
        }
      });


    },
    onError: (error: any) => {
      this.isLoading = false; // Masquer l'indicateur de chargement
      // this.message.error('Une erreur est survenue lors de la récupération des budgets.');
    },
  }));

  semaines: any;
  FetchBudgetbyIDMutation = injectMutation(() => ({
    mutationFn: (id: any) => this._Budgets.getById(id), // Récupérer les budgets pour une année spécifique
    onMutate: () => {
      this.isLoading = true; // Afficher un indicateur de chargement
    },
    onSuccess: (data: any) => {
      this.semaines = this.mergeVacationsWithBudget(data, this.vacationsData)
      this.isLoading = false; // Masquer l'indicateur de chargement
      const uniqueWeeks: any = [];
      const seenWeeks = new Set();
      this.vacationsData.forEach((item: { week: unknown; }) => {
        if (!seenWeeks.has(item.week)) {
          uniqueWeeks.push(item);
          seenWeeks.add(item.week);
        }
      });

      const NUMBEROFWEEKS = Object.keys(data.year_weeks[12])
        .map(Number) // Convert keys to numbers
        .reduce((maxKey, currentKey) => (currentKey > maxKey ? currentKey : maxKey), -Infinity);


      this.semaineRest = NUMBEROFWEEKS - uniqueWeeks.length




    },
    onError: (error: any) => {
      this.isLoading = false; // Masquer l'indicateur de chargement
      // this.message.error('Une erreur est survenue lors de la récupération des budgets.');
    },
  }));





  onChange(result: any): void {
    this.dateBudget = result.getFullYear();
  }


  onChange1(result: any): void {
    if (result == null) {
      let year = new Date()
      this.SelectedYear = year

      let YEAR = this.SelectedYear.getFullYear()
      this.FetchBudgetsMutation.mutate(YEAR)
    } else {
      let year = new Date(result)
      this.SelectedYear = year

      let YEAR = this.SelectedYear.getFullYear()
      this.FetchBudgetsMutation.mutate(YEAR)
    }
  }
  OpenModalFilterDate() {
    this.isFilterDateOpen = true
  }

  isFilterDateOpen: boolean = false;


  ComfirmModalFiltrageFilter() {
    this.GetData.mutate()
  }

  handleCloseDateModalFilter() {
    this.isFilterDateOpen = false
  }
  date: any = "";

  GetData = injectMutation((client: any) => ({
    mutationFn: () => this._WeeksComparisonService.getAll({ all: true, year: this.currentYear }),
    onMutate: () => {
      this.isLoading = true;
    },
    onSuccess: (data: any) => {
      this.isLoading = false;

      this.SelectedYear = this.currentYear;
      this.data = data;
      client.invalidateQueries({ queryKey: ['WeeksComparison'] });
    },
    onError: (error: any) => {
      this.isLoading = false;
    },
  }));

  @ViewChild(VacationComponent) appVacation!: VacationComponent;

  OpenTabVacation() {
    this.appVacation.Refetch()
  }
}
