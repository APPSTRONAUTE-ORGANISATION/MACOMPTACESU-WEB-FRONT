import { Component } from '@angular/core';
import { PageTemplateComponent } from "../../../../layouts/page-template/page-template.component";
import { WeeksComparisonService } from '../../../../data/services/weeksComparison/weeks-comparison.service';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { NgForOf, NgIf } from '@angular/common';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-weeks',
  standalone: true,
  imports: [PageTemplateComponent, NgIf, FormsModule, ReactiveFormsModule, NgForOf, NzPopoverModule, NzDatePickerModule, NzButtonModule],
  templateUrl: './weeks.component.html',
  styleUrl: './weeks.component.css'
})
export class WeeksComponent {

  onChange(result: any): void {
    this.currentYear = result.getFullYear();
  }
  OpenModalFilterDate() {
    this.isFilterDateOpen = true
  }
  isLoading: boolean = true;
  data: any;
  currentYear: any;
  isFilterDateOpen: boolean = false;

  constructor(private _WeeksComparisonService: WeeksComparisonService) {
    this.GetData.mutate();
    this.currentYear = new Date().getFullYear();

  }
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
      this.data = data;
      client.invalidateQueries({ queryKey: ['WeeksComparison'] });
    },
    onError: (error: any) => {
      this.isLoading = false;    },
  }));

  weeks = ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'];

  getBudgetTotal(month: number, week: string): string {
    const weekNumber = parseInt(week.split(' ')[1], 10);
    const entry = this.data?.find(
      (item: { budget_month: string; budget_week: string; }) => parseInt(item.budget_month) === month && parseInt(item.budget_week) === weekNumber
    );
    return entry ? entry.budget_total : '-';
  }

  getMonthlyTotal(month: number): number {
    return this.data
      ?.filter((item: { budget_month: string; }) => parseInt(item.budget_month) === month)
      ?.reduce((sum: number, item: { budget_total: string; }) => sum + parseInt(item.budget_total), 0);
  }



}
