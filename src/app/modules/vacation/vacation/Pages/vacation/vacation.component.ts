import { Component, OnInit } from '@angular/core';
import { PageTemplateComponent } from "../../../../../layouts/page-template/page-template.component";
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { VacationWeeksService } from '../../../../../data/services/vacation_weeks/vacation-weeks.service';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { NzButtonModule } from 'ng-zorro-antd/button';


@Component({
  selector: 'app-vacation',
  standalone: true,
  imports: [PageTemplateComponent,NzButtonModule , NzSelectModule,ReactiveFormsModule ,NzModalModule, FormsModule ,NzCalendarModule, NzDatePickerModule , ReactiveFormsModule , CommonModule],
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css']
})
export class VacationComponent implements OnInit {
  SelectedWeek : any ;
HandleComfirmDeleteModal() {
  if(this.SelectedWeek) {

    let weekID = this.vacations.find((e: any) => e.week === this.SelectedWeek)?.id;

    this.DelteUserMutation.mutate(weekID)
  }
}
handleCancelDeleteModal() {
  this.SelectedWeek = null;
  this.ShowDeleteModal = false;
}


ShowDeleteModal : boolean = false;
showDeleteModal(week: number) {
    if(this.isSelectedWeek(week)){
      this.ShowDeleteModal = true;
      this.SelectedWeek= week;

    }
  }
  isLoadingVacations: boolean = true;
  IsAdding: boolean = false;
closeModal() {
  this.yearWeekForm.reset()
  this.isModalVisible = false;
}

  yearWeekForm!: FormGroup;

  constructor(private fb: FormBuilder , private _VacationService : VacationWeeksService) {
    this.getVacationMutation.mutate(this.SelectedYear.getFullYear())
    this.yearWeekForm = this.fb.group({
      week: [
        '',
        [Validators.required, Validators.min(1), Validators.max(52)], // Ensure week is between 1 and 52
      ],
    });
  }
  ngOnInit(): void {

  }
  vacations : any ;

  getVacationMutation = injectMutation((client: any) => ({
    mutationFn: (year: any) => this._VacationService.getAll({all:true , year : year}),
    onMutate: () => {
      this.ArraySelectedWeeks = [];
      this.isLoadingVacations = true; // Set loading state to true before the request
    },

    onSuccess: (data:any) => {
      this.vacations = data.data;
      this.year = this.SelectedYear.getFullYear()
      this.ArraySelectedWeeks = data.data.map((e:any) => {
        if ( e.year == this.SelectedYear.getFullYear()) {
          return e.week;
        }
      })

      this.isLoadingVacations = false; // Set loading state to false on success
    },

    onError: (error) => {
      this.isLoadingVacations = false; // Set loading state to false on error
    }
  }));



  addUserMutation = injectMutation((client: any) => ({
    mutationFn: (data: any) => this._VacationService.create(data),
    onMutate:() => {
      this.IsAdding = true;

    },
    onSuccess: () => {
      this.IsAdding = false;
      this.yearWeekForm.reset();
      this.getVacationMutation.mutate(this.SelectedYear.getFullYear())
      this.closeModal()

    },
    onError :() => {
      this.IsAdding = false;
    }
  }));
  DelteUserMutation = injectMutation((client: any) => ({
    mutationFn: (data: any) => this._VacationService.delete(data),
    onMutate:() => {
      this.IsAdding = true;

    },
    onSuccess: () => {
      this.IsAdding = false;
      this.ShowDeleteModal = false;
      this.yearWeekForm.reset();
      this.getVacationMutation.mutate(this.SelectedYear.getFullYear())

    },
    onError :() => {
      this.IsAdding = false;
    }
  }));


  months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  SelectedYear : Date = new Date();

  SemaineYear : any ;
  monthNames = this.months;

  year = new Date().getFullYear();

  // Array of selected weeks
  ArraySelectedWeeks : number []= [];

  submit() {
    if(this.yearWeekForm.valid) {
      this.addUserMutation.mutate(
        {
          year : new Date(this.yearWeekForm.value["week"]).getFullYear(),
          week : this.getWeekNumber(this.SemaineYear)
        }
      )
    }

  }

  isModalVisible : boolean = false;
  openModalAdd() {
    this.yearWeekForm.reset()
    this.isModalVisible = true;
  }

  getDaysOfMonth(month: number, year: number): number[] {
    const date = new Date(year, month, 1);
    const daysInMonth = [];
    while (date.getMonth() === month) {
      daysInMonth.push(date.getDate());
      date.setDate(date.getDate() + 1);
    }
    return daysInMonth;
  }

  getFirstDayOfMonth(month: number, year: number): number {
    const date = new Date(year, month, 1);
    return date.getDay();
  }


  getWeekNumber(date: Date): number {
    const startDate = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + startDate.getDay() + 1) / 7);
  }

  onDateChange(selectedDate: any): void {
    this.getVacationMutation.mutate(selectedDate.getFullYear())

  }
  getWeeksForMonth(month: number, year: number): { weekNumber: number, days: number[] }[] {
    const daysInMonth = this.getDaysOfMonth(month, year);
    const firstDayOfMonth = this.getFirstDayOfMonth(month, year);
    const weeks = [];
    let currentWeek: number[] = [];
    let currentWeekNumber = this.getWeekNumber(new Date(year, month, 1));

    // Fill in empty days before the first day of the current month
    for (let i = 0; i < firstDayOfMonth; i++) {
      currentWeek.push(0); // Empty day placeholder
    }

    // Add days of the current month
    daysInMonth.forEach(day => {
      currentWeek.push(day);

      // If the current week is full (7 days), push it and reset for the next week
      if (currentWeek.length === 7) {
        weeks.push({ weekNumber: currentWeekNumber++, days: [...currentWeek] });
        currentWeek = [];
      }
    });

    // If the last week has remaining days, fill with empty days
    if (currentWeek.length > 0) {
      for (let i = currentWeek.length; i < 7; i++) {
        currentWeek.push(0); // Empty day placeholder
      }
      weeks.push({ weekNumber: currentWeekNumber, days: [...currentWeek] });
    }

    // Adjust for the correct number of weeks based on the month's number of days
    const totalWeeks = weeks.length;
    if (month === 1) { // January (5 weeks max)
      while (totalWeeks < 5) {
        weeks.push({ weekNumber: currentWeekNumber++, days: [0, 0, 0, 0, 0, 0, 0] });
      }
    } else if (month === 0) { // February (4 weeks max)
      while (totalWeeks < 4) {
        weeks.push({ weekNumber: currentWeekNumber++, days: [0, 0, 0, 0, 0, 0, 0] });
      }
    }

    return weeks;
  }



  isSelectedWeek(weekNumber: number): boolean {
    return this.ArraySelectedWeeks.includes(weekNumber);
  }

  Refetch() {
    this.getVacationMutation.mutate(this.SelectedYear.getFullYear())
  }
}
