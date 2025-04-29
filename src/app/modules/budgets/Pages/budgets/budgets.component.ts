import { Component, OnInit } from '@angular/core';
import { PageTemplateComponent } from "../../../../layouts/page-template/page-template.component";
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormGroup, FormBuilder, FormArray, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { BudgetsService } from '../../../../data/services/budgets/budgets.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [PageTemplateComponent, NzToolTipModule, NzPopconfirmModule, NzModalModule, NzPopoverModule, FormsModule, NzButtonModule, NzSelectModule, NzSegmentedModule, NzDatePickerModule, NzSegmentedModule, ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.css'
})
export class BudgetsComponent implements OnInit {



  isEditModalOpen: boolean = false;
  currentYear: number = 0;
  isFilterDateOpen: boolean = false
  isDeletingBudget: boolean = false
  isUpdatingBudget: boolean = false;
  Budgets: any;
  date: any;
  isOpenAddModal = false;
  formGroup: FormGroup;
  weeks = [
    { label: 'Semaine 1', value: 1 },
    { label: 'Semaine 2', value: 2 },
    { label: 'Semaine 3', value: 3 },
    { label: 'Semaine 4', value: 4 },
  ];
  isLoadingFilter: boolean = false;
  isDeleteModalOpen: boolean = false;
  dateFormat = 'yyyy';
  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();

  }

  confirm(entry: any): void {
    this.deleteBudgetsMutations.mutate(entry)
  }

  cancel(): void {
    this.nzMessageService.info('Deletion canceled.');
  }

  onChange(result: Date): void {
    this.currentYear = result.getFullYear();
  }
  handleCloseDateModalFilter() {
    this.isFilterDateOpen = false
  }
  handleCancelDeleteModal() {
    this.isDeleteModalOpen = false;
  }
  ComfirmModalFiltrageFilter() {
    this.getBudgetsMutations.mutate()
  }

  openEditModal(SelectedMonths: any) {
    this.selectedData = SelectedMonths;
    this.isEditModalOpen = true;
  }
  openDeleteModal(SelectedMonths: any) {
    this.selectedData = SelectedMonths;
    this.isDeleteModalOpen = true;
  }
  OpenModalFilterDate() {
    this.isFilterDateOpen = true;
  }

  editingEntry: any = null;

  isEditing(entry: any): boolean {
    return this.editingEntry === entry;
  }

  enableEdit(entry: any): void {
    this.editingEntry = entry;
  }

  disableEdit(entry: any): void {
    this.updateBudgetsMutations.mutate(entry)
    this.editingEntry = null;
  }
  selectedData: any = [];



  isLoadingBudgets: boolean = false;
  months = [
    { value: 1, name: 'Janvier' },
    { value: 2, name: 'Février' },
    { value: 3, name: 'Mars' },
    { value: 4, name: 'Avril' },
    { value: 5, name: 'Mai' },
    { value: 6, name: 'Juin' },
    { value: 7, name: 'Juillet' },
    { value: 8, name: 'Août' },
    { value: 9, name: 'Septembre' },
    { value: 10, name: 'Octobre' },
    { value: 11, name: 'Novembre' },
    { value: 12, name: 'Décembre' },
  ];
  isAddingNewbudgets: boolean = false;
  constructor(private fb: FormBuilder, private nzMessageService: NzMessageService, private _BudgetsService: BudgetsService, private message: NzMessageService) {
    this.formGroup = this.fb.group({
      records: this.fb.array([this.createRecord()])
    });
    this.getBudgetsMutations.mutate()
  }

  //mutations  :



  getMonthName(month: number): string {
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    return months[month - 1];
  }


  getBudgetsMutations = injectMutation<any>(
    () => ({
      mutationFn: () =>
        this._BudgetsService.getAll({ all: true, year: this.currentYear }),
      onMutate: () => {
        this.isLoadingBudgets = true;
        this.isLoadingFilter = true;
      },
      onSuccess: (data) => {
        this.Budgets = data;
        this.isLoadingBudgets = false;
        this.isLoadingFilter = false;

        this.isFilterDateOpen = false;
      },
      onError: () => {
        this.message.error("Réessayer : problème de connexion en cours.");
        this.isLoadingBudgets = false;
        this.isLoadingFilter = false;


      }
    })
  );

  addBudgetsMutations = injectMutation<any>(
    () => ({
      mutationFn: (data: any) =>
        this._BudgetsService.create({
          data
        }),
      onMutate: () => {
        this.isAddingNewbudgets = true;
      },
      onSuccess: () => {
        this.isAddingNewbudgets = false;
        this.isOpenAddModal = false
        this.formGroup.reset();
        this.getBudgetsMutations.mutate()
      },
      onError: () => {
        // this.message.error(error?.message);
        this.isAddingNewbudgets = false;
        this.getBudgetsMutations.mutate()

      }
    })
  );


  deleteBudgetsMutations = injectMutation<any>(
    () => ({
      mutationFn: (entry: any) =>
        this._BudgetsService.delete(entry.id),
      onMutate: () => {
        this.isDeletingBudget = true;
      },
      onSuccess: () => {
        this.isDeletingBudget = false;
        this.message.success('Suppression réussie');
        this.handleCancelDeleteModal();

        this.getBudgetsMutations.mutate();
      },
      onError: (error) => {
        this.message.error(error?.message || 'Une erreur s\'est produite lors de la suppression.');
        this.isDeletingBudget = false;
      }
    })
  );

  updateBudgetsMutations = injectMutation<any>(
    () => ({
      mutationFn: (entry: any) =>
        this._BudgetsService.update(entry.id, entry),
      onMutate: () => {
        this.isUpdatingBudget = true;
      },
      onSuccess: () => {
        this.isUpdatingBudget = false;
        this.message.success('Mise à jour réussie');
        this.getBudgetsMutations.mutate();
      },
      onError: (error) => {
        this.message.error(error?.message || 'Une erreur s\'est produite lors de la mise à jour.');
        this.isUpdatingBudget = false;
      }
    })
  );


  get records(): FormArray {
    return this.formGroup.get('records') as FormArray;
  }

  ClearModalAddBudgets() {
    this.isOpenAddModal = false
    this.formGroup.reset();
  }




  createRecord(): FormGroup {
    return this.fb.group({
      year: [null, Validators.required],
      month: [null, Validators.required],
      week: [1, Validators.required],
      amount: [null, Validators.required]
    });
  }
  OpenModalAdd() {
    this.formGroup.reset()
    this.isOpenAddModal = true;
  }

  addRecord(): void {
    this.records.push(this.createRecord());
  }

  removeRecord(index: number): void {
    this.records.removeAt(index);
  }

  onSubmit(): void {
    if (this.formGroup.valid) {

      let payload = this.formGroup.value['records'].map((record: any) => {
        const date = new Date(record.year);
        return {
          ...record,
          year: date.getUTCFullYear() // Formats year as YYYY
        };


      })
      this.addBudgetsMutations.mutate(payload);

    }
  }
}
