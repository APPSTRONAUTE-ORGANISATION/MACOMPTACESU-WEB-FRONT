import { Component, ViewChild } from '@angular/core';
import { PageTemplateComponent } from "../../../../layouts/page-template/page-template.component";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  NgApexchartsModule
} from "ng-apexcharts";
import { CommonModule, NgIf } from '@angular/common';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { GraphService } from '../../../../data/services/graph/graph.service';
import { RouterModule } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { BudgetsService } from '../../../../data/services/budgets/budgets.service';
import { ShortenNumberPipe } from "../../../../shared/pipes/shortenNumber/shorten-number.pipe";
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ReplacePipe } from "../../../../shared/pipes/replace/replace.pipe";
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { FormsModule } from '@angular/forms';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSpinModule } from 'ng-zorro-antd/spin';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart & { borderRadius?: string | number }; // Added borderRadius to the chart type
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions & {
    bar?: {
      borderRadius?: number; // Added borderRadius to the bar plot options
    };
  };
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [PageTemplateComponent, NzToolTipModule, NzSpinModule, NzEmptyModule, NzTagModule, FormsModule, RouterModule, NzSegmentedModule, NgApexchartsModule, CommonModule, NgIf, NzBreadCrumbModule, ShortenNumberPipe, ReplacePipe],
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent {
  @ViewChild("chart", { static: false }) chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  isLoading: any;
  GraphData!: { budget_realisation_comparison: any, activities_data: any, month_ratio: any, trailers: any };
  activities: any;
  isLoadingGraph: boolean = true;
  CalenderData: any;
  Object: any;
  months: string[] = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  isLoadingBudgets: boolean = true;
  message: any;
  totalsTable: any;

  currentDate: Date = new Date()
  constructor(private _Budgets: BudgetsService, private _GraphService: GraphService) {
    this.chartOptions = {
      series: [
        {
          name: "",
          data: [0, 0,]
        },
        {
          name: "",
          data: [50, 0]
        }
      ],
      chart: {
        type: "bar",
        height: 290,
        foreColor: "#7B8594", // Optional, adjusts text color
        toolbar: {
          show: true
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "35%",
          borderRadius: 8 // Adjusts the corner radius of the bars (2xl equivalent)
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct"
        ]
      },
      yaxis: {
        tickAmount: 5,  // Number of ticks on Y-axis (adjust as needed)
        logarithmic: true, // Apply logarithmic scale
        min: 0, // Ensures the y-axis starts from 0
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
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "€ " + val + " thousands";
          }
        }
      }
    };
    this.FetchBudgetsMutation.mutate(this.currentYear)
    // this.GetCalenderMutation.mutate()
    // this.GetGraphData.mutate();
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

  calculateTotals(data: any[]) {
    return data.reduce(
      (acc, current) => {
        acc.total += current.total;
        acc.budget += current.budget;
        acc.diffrence += current.diffrence;
        return acc;
      },
      { total: 0, budget: 0, diffrence: 0 }
    );
  }

  MonthDataInvoices: any;
  getMonthDataInvoices() {
    const fullMonthData = [];
    // [
    //   {
    //       "month": 1,
    //       "total_invoices": null,
    //       "budget": 124,
    //       "diffrence": null
    //   }
    // ]

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

  FetchBudgetsMutation = injectMutation((client: any) => ({
    mutationFn: (year: number) => this._Budgets.getAll({ year }), // Récupérer les budgets pour une année spécifique
    onMutate: () => {
      this.isLoadingBudgets = true; // Afficher un indicateur de chargement
    },
    onSuccess: (data: any) => {
      this.isLoadingBudgets = false; // Masquer l'indicateur de chargement
      this.budgets = data; // Stocker les budgets récupérés dans une variable locale
      const petitEntries = data.data.filter((item: any) => item.name === 'petit');
      this.SelectedBudget = petitEntries[petitEntries.length - 1];
      this.selectedoptionBudget = 0;
      this.GetGraphData.mutate(petitEntries[petitEntries.length - 1].id)
    },
    onError: (error: any) => {
      this.isLoadingBudgets = false; // Masquer l'indicateur de chargement
      this.message.error('Une erreur est survenue lors de la récupération des budgets.');
    },
  }));




  monthDataTotals: any;
  GetGraphData = injectMutation((client: any) => ({
    mutationFn: (budget_id: any) => this._GraphService.getAll({ budget_id: budget_id }),
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
              existingMonth.budget = parseFloat(this.SelectedBudget.amount) / 12;
              existingMonth.diffrence = existingMonth.total - existingMonth.budget;

            } else {
              acc.push({
                month: item.month,
                total: item.total,
                // budget: parseFloat(item.budget),
                budget: parseFloat(this.SelectedBudget.amount) / 12,
                diffrence: item.total - parseFloat(item.budget)  // Calculate difference on first entry

              });
            }
            return acc;
          }, []);
          data.budget_realisation_comparison = aggregatedData;

        }
      }

      this.GraphData = data;
      this.calculateAverageAndCount()
      this.MonthDataInvoices = this.getMonthDataInvoices()
      this.monthDataTotals = this.calculateTotals(this.MonthDataInvoices);
      this.totalsTable = this.calculateTotalsTable(data?.activities_data);

      this.updateChartData()
      client.invalidateQueries({ queryKey: ['graph'] });
    },
    onError: (error: any) => {
      this.isLoadingGraph = false;
    },
  }));


  average: number = 0;
  count: number = 0;
  groupByMonthAndCalculateTotals(data: any[]): any[] {
    const monthlyData: { month: any; totalRate: number; count: number; }[] = [];

    // Group by month and calculate totals for each month
    data?.forEach((item) => {
      let found = monthlyData.find((i) => i.month === item.month);

      const rate = parseFloat(item.ratio_euro_per_hour) * parseInt(item.hours);

      if (found) {
        found.totalRate += rate;
        found.count++;
      } else {
        monthlyData.push({
          month: item.month,
          totalRate: rate,
          count: 1,
        });
      }
    });

    return monthlyData.map(item => ({
      month: item.month,
      rate: item.totalRate / item.count,
    }));
  }

  currentYear: any = new Date().getFullYear()
  updateChartData() {
    // Extract data from GraphData

    const budgetData = this.MonthDataInvoices.map((item: { budget: any; }) =>
      parseFloat(item.budget) === 0 ? (this.SelectedBudget.amount / 12) : parseFloat(item.budget)
    );

    const invoiceData = this.MonthDataInvoices.map((item: { total: any; }) =>
      parseFloat(item.total || 0) === 0 ? null : parseFloat(item.total || 0)
    );
    // Ensure we have 12 months of data, filling missing months with 0 if necessary
    while (budgetData.length < 12) {
      budgetData.push(0);
      invoiceData.push(0);
    }

    // Update chart options
    this.chartOptions = {
      series: [
        {
          name: "Prévision",
          data: budgetData,
          color: "#5DBF96" // Blue color for Invoices

        },
        {
          name: "Reel",
          data: invoiceData,
          color: "#2C52F5" // Orange color for Budget

        }
      ],
      legend: {
        position: 'top' // Change this to 'top', 'right', 'bottom', or 'left'
      },
      chart: {
        type: "bar",
        height: 290,
        foreColor: "#7B8594", // Optional, adjusts text color
        toolbar: {
          show: true
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "25px", // Specify bar width in pixels
          borderRadius: 2, // Adjusts the corner radius of the bars (2xl equivalent)

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
          "Janv", "Fév", "Mars", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"
        ]
      },

      yaxis: {
        min: 0, // Ensures the y-axis starts from 0
        logarithmic: true,
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
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return `${val.toFixed(2)}€`;
          }
        }
      },


    };


  }
  selectedoptionBudget: any;
  SelectedBudget: any;
  options = ['petit', 'moyen', 'grand'];
  budgets: any;
  handleValueChange(e: number): void {
    this.selectedoptionBudget = e;
    const petitEntries = this.budgets.data.filter((item: any) => item.name === this.options[e]);
    let lastidbudget = petitEntries[petitEntries.length - 1].id
    this.SelectedBudget = petitEntries[petitEntries.length - 1];

    this.GetGraphData.mutate(lastidbudget)

  }

  calculateAverageAndCount(): void {
    const monthlyRates = this.groupByMonthAndCalculateTotals(this.GraphData?.month_ratio);

    const totalRate = monthlyRates.reduce((sum, item) => sum + item.rate, 0);
    this.average = totalRate / monthlyRates.length || 0;
    this.count = monthlyRates.length;
  }


  getTotalsInvoices(data: { month: string; total: string | null; budget: string; diffrence: string | null }[]) {
    return data.reduce(
      (acc, item) => {
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


}
