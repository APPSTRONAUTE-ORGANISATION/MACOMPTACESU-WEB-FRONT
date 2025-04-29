import { Component } from '@angular/core';
import { PageTemplateComponent } from "../../../../layouts/page-template/page-template.component";
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { RouterModule } from '@angular/router';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { CommonModule } from '@angular/common';
import { BudgetsService } from '../../../../data/services/budgets/budgets.service';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { ReplacePipe } from "../../../../shared/pipes/replace/replace.pipe";
import { ShortenNumberPipe } from "../../../../shared/pipes/shortenNumber/shorten-number.pipe";
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ChartComponent } from "ng-apexcharts";
import { InvoicesService } from '../../../../data/services/invoices/invoices.service';

@Component({
  selector: 'app-comparatif',
  standalone: true,
  imports: [PageTemplateComponent, FormsModule, NzSegmentedModule, CommonModule, NzBreadCrumbModule, RouterModule, ShortenNumberPipe, ChartComponent],
  templateUrl: './comparatif.component.html',
  styleUrls: ['./comparatif.component.css']
})
export class ComparatifComponent {
  SortAndSolve(arg0: any): any {
    return Object.values(arg0 || []);
  }
  avg: any;
  total: any;
  getTotalRow(data: any) {
    let totalInvoices = 0;
    let totalBudget = 0;

    // Iterate over each key in the data object
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        totalInvoices += data[key].total;
        totalBudget += data[key].Budget;
      }
    }

    return {
      totalInvoices,
      totalBudget
    };
  }


 getMonthlyAveragesArray(data: any[]): number[] {
    const monthTotals: { [month: number]: number[] } = {};
  
    // Collect totals by month
    data.forEach(entry => {
      entry.DATAOFSELECTEDBUDGET.forEach((item:any) => {
        if (!monthTotals[item.month]) {
          monthTotals[item.month] = [];
        }
        monthTotals[item.month].push(item.total);
      });
    });
  
    // Return flat array of averages from month 1 to 12
    return Array.from({ length: 12 }, (_, i) => {
      const month = i + 1;
      const totals = monthTotals[month] || [];
      const avg = totals.length > 0 ? totals.reduce((sum, val) => sum + val, 0) / totals.length : 0;
      return avg;
    });
  }
  


  getSelectedoptionsfunc(data: any): any {
    return data.findIndex((budget: any) => budget.is_selected === true);
  }
  chartOptions: any;


  budgets: any;
  GraphData: Record<string, any> = {};
  yearsData: { year: string; data: any[] }[] = [];
  isLoadingBudgets: boolean = true;
  months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  options = ['PETIT', 'MOYEN', 'GRAND'];
  groupByYear(data: any[]) {
    return data.reduce((acc, item) => {
      const year = item.year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(item);
      return acc;
    }, {});
  }


  updateSelectedBudget(data: any[], selectedItem: any) {
    // Iterate over each year entry
    data.forEach(yearEntry => {
      // Check if the year of the current entry matches the selected item's year
      if (yearEntry.year === selectedItem.year) {
        // Set all is_selected to false for each budget in the selected year
        yearEntry.BUDGETS.forEach((budget: { is_selected: boolean; }) => {
          budget.is_selected = false;
        });

        // Find the specific item to set is_selected to true
        const budgetToUpdate = yearEntry.BUDGETS.find((budget: { id: any; }) => budget.id === selectedItem.id);
        if (budgetToUpdate) {
          budgetToUpdate.is_selected = true;
        }
      }
    });

    return data;
  }







  handleValueChange(e: number, budgets: any): void {
    this.DATACOMPARATIF = this.updateSelectedBudget(this.DATACOMPARATIF, budgets[e])
    this.FetchBudgetbyIDMutation.mutate()

  }




  calculateTotalForEachMonth(yearWeeks: any) {
    const totals: { [key: string]: { budget: number, invoices: number } } = {};

    for (const month in yearWeeks) {
      if (yearWeeks.hasOwnProperty(month)) {
        let monthlyBudgetTotal = 0;
        let monthlyInvoicesTotal = 0;

        for (const week in yearWeeks[month]) {
          if (yearWeeks[month].hasOwnProperty(week)) {
            monthlyBudgetTotal += yearWeeks[month][week].budget;
            monthlyInvoicesTotal += yearWeeks[month][week].invoices;
          }
        }

        totals[month] = {
          budget: monthlyBudgetTotal,
          invoices: monthlyInvoicesTotal
        };
      }
    }

    return totals;
  }


  
  isLoadingGetInvoicesStats: boolean = false;
  GetInvoicesMonthsBudgetMutation = injectMutation((client: any) => ({
    mutationFn: (year :any) => this._InvoicesService.getTotalsWithBudgetsForMonths({ all: true, year }),
    onMutate: () => {
      this.isLoadingGetInvoicesStats = true;
    },
    onSuccess: (data: any) => {

      const allMonths = Array.from({ length: 12 }, (_, i) => i + 1); // [1, 2, ..., 12]
      let dataInvoicesForMonth ;

      dataInvoicesForMonth = allMonths.map(month => {
        const found = data.find((item: { month: number; }) => item.month === month);
        return {
          month,
          total: found ? found.total : 0
        };
      });

     


    },
    onError: (error: any) => {
      this.isLoadingGetInvoicesStats = false;
    },
  }));




  processBudgets(data: any[]): any[] {
    return data.map((yearEntry) => {
      const selectedBudget = yearEntry.BUDGETS.find((b: { is_selected: any; }) => b.is_selected);
      const monthlyBudget = selectedBudget ? selectedBudget.amount / 12 : 0;
  
      const existingData = yearEntry.DATAOFSELECTEDBUDGET || [];
      const completeBudget: any[] = [];
  
      for (let month = 1; month <= 12; month++) {
        const existing = existingData.find((item: { month: number; }) => item.month === month);
        completeBudget.push({
          month,
          total: existing ? existing.total : 0,
          Budget: monthlyBudget
        });
      }
  
      return {
        ...yearEntry,
        DATAOFSELECTEDBUDGET: {
           ...completeBudget
        }
      };
    });
  }

  isLoadingBEDJUSTS: boolean = false;
  FetchBudgetbyIDMutation = injectMutation(() => ({
    mutationFn: async () => {
      try {


        // Process the budgets for each year dynamically using the keys of this.DATACOMPARATIF
        const updatedData = await Promise.all(Object.keys(this.DATACOMPARATIF).map(async (yearStr) => {
          const year = parseInt(yearStr); // Convert the key to a number (year)
          let yearData = this.DATACOMPARATIF[year]; // Get the budgets data for the year
          // Fetch the selected budget data for the year using the selected ID (id should be the selected budget id)
          const selectedId = yearData.BUDGETS.find((budget: { is_selected: boolean }) => budget.is_selected)?.id;

          // If selectedId is found, fetch the data from the service and update DATAOFSELECTEDBUDGET
          if (selectedId) {
            try {
              
              const budgetDetails = await this._InvoicesService.getTotalsWithBudgetsForMonths({all : true , year}); // Fetch details of selected budget
              yearData.DATAOFSELECTEDBUDGET = []

              yearData.DATAOFSELECTEDBUDGET =budgetDetails;
              
            } catch (error) {
              yearData.DATAOFSELECTEDBUDGET = []; // In case of an error, ensure DATAOFSELECTEDBUDGET is empty
            }
          }

          return yearData; // Return the updated year data
        }));
        this.DATACOMPARATIF = this.processBudgets(updatedData);

      this.avg = this.getMonthlyAveragesArray(updatedData)
      this.total = this.getMonthlyAveragesArray(updatedData).reduce((e, cur) => e + cur, 0);
    } catch (error) {
      } finally {
        this.isLoadingBEDJUSTS = false; // Hide loading indicator
      }
    },
    onMutate: () => {
      this.isLoadingBEDJUSTS = true; // Show loading indicator
    },
    onSuccess: () => {
      // Success logic handled inside mutationFn

      this.chartOptions = {
        series: [
          {
            name: "Prévision",
            data: [...this.avg], // Your actual data here
            color: "#5DBF96" // Color for "Prévision"
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
        xaxis: {
          categories: [
            "Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"
          ],

        },
        yaxis: {
          min: 0, // Ensures the y-axis starts from 0
          logarithmic: false, // Remove logarithmic scale if not necessary
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
        tooltip: {
          y: {
          }
        },
        legend: {
          position: 'top', // Can be 'top', 'right', 'bottom', 'left'
          horizontalAlign: 'right', // Centers the legend horizontally
          floating: true, // Allows floating of the legend
          offsetY: 10, // Adjusts the vertical position of the legend
        },
      };

    },
    onError: (error: any) => {
      this.isLoadingBEDJUSTS = false; // Hide loading indicator
    },
  }));
  transformInput(input: { [x: string]: any[]; }) {
    const output: any = {};

    for (const year in input) {
      // Map budgets and set the first item as selected by default
      const budgets = input[year].map((budget: any, index: number) => ({
        ...budget,
        is_selected: index === 0 // Set is_selected to true for the first item
      }));

      output[year] = {
        year: parseInt(year),
        BUDGETS: budgets,
        DATAOFSELECTEDBUDGET: [] // Keep as empty array for now
      };
    }

    return output;
  }

  DATACOMPARATIF: any;

  selectedBugets: any;
  FetchBudgetsMutation = injectMutation(() => ({
    mutationFn: (year: number) => this._Budgets.getAll({ all: true }), // Récupérer les budgets pour une année spécifique
    onMutate: () => {
      this.isLoadingBudgets = true; // Afficher un indicateur de chargement
    },
    onSuccess: (data: any) => {
      this.isLoadingBudgets = false; // Masquer l'indicateur de chargement
      this.DATACOMPARATIF = this.transformInput(this.groupByYear(data.data))
      this.budgets = data; // Stocker les budgets récupérés dans une variable locale
      this.FetchBudgetbyIDMutation.mutate()
      const currentYear = new Date().getFullYear();
      const yearsToFetch = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];

      const budgetData = yearsToFetch.map((year) => {
        const yearEntries = data.data.filter((entry: { year: number; }) => entry.year === year);

        const nameIdMapping = yearEntries.reduce((acc: { name: any; id: any; }[], entry: { name: any; id: any; }) => {
          acc.push({ name: entry.name, id: entry.id });
          return acc;
        }, []);

        return {
          year,
          entries: nameIdMapping,
        };
      });

      this.selectedBugets = budgetData;
    },
    onError: (error: any) => {
      this.isLoadingBudgets = false; // Masquer l'indicateur de chargement
    },
  }));


  monthlyTotals: any;

  constructor(private translate: TranslateService, private _Budgets: BudgetsService , private _InvoicesService : InvoicesService) {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('fr');
    this.chartOptions = {
      series: [
        {
          name: '',
          data: this.monthlyTotals || []  // Ensure monthlyTotals is defined and has data
        }
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          distributed: false, // Ensure all bars are the same color
          horizontal: false,
          columnWidth: '34%',
          borderRadius: 2, // Adds rounded corners to the top
        }
      },
      dataLabels: {
        enabled: false
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
        categories: this.months || [], // Ensure months is defined and has data
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      title: {
        text: this.monthlyTotals && this.monthlyTotals.length > 0 ? 'Moyenne' : 'Chargement en cours...', // Dynamically change title
        align: 'center',
        style: {
          fontSize: '12px',
          fontFamily: 'Arial'
        }
      }
    };

    let year = new Date().getFullYear();
    this.FetchBudgetsMutation.mutate(year)

  }
}
