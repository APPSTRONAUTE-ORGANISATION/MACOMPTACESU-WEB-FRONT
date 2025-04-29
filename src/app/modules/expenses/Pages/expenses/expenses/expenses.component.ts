import { Component, HostListener, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { PageTemplateComponent } from "../../../../../layouts/page-template/page-template.component";
import {NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import { NzOptionComponent, NzSelectComponent } from "ng-zorro-antd/select";
import { NzColDirective } from "ng-zorro-antd/grid";
import { NzTagComponent } from "ng-zorro-antd/tag";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { injectMutation } from "@tanstack/angular-query-experimental";
import { ExpensesService } from "../../../../../data/services/expenses/expenses.service";
import { NzMessageService } from "ng-zorro-antd/message";
import {CommonModule, CurrencyPipe, DatePipe, JsonPipe, KeyValuePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {NzModalComponent} from "ng-zorro-antd/modal";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import { ExpensesLabelsService } from '../../../../../data/services/expeneses_labels/expenses-labels.service';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopoverModule } from 'ng-zorro-antd/popover';


@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    PageTemplateComponent,
    NzFormControlComponent,
    NzOptionComponent,
    NzSelectComponent,
    NzColDirective,
    NzTagComponent,
    NzButtonComponent,
    ReactiveFormsModule,
    NzSpinModule,
    DatePipe,
    NgForOf,
    NgIf,
    NzPopoverModule,
    CurrencyPipe,
    NzCollapseModule,
    CommonModule,
    NzFormItemComponent,
    NzModalComponent,
    NzPaginationComponent,
    NzUploadModule,
    NzTableModule
  ],
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  selectedId! : number;
  formCategory!: FormGroup;
  formAddLabel!: FormGroup;
  expenseForm!: FormGroup;
  isDeletingCategory: boolean = false;
  isLoadingCategoryDepense: boolean = false;
  isLoadingCategories: boolean = true;
  isDeleteModalExpensesOpen : boolean = false;
  categoriesExpense: any;
  Expenses: any;
  isLoadingExpense: boolean = true;
  isLoadingAddExpense: boolean = false;
  isOpenDeleteModal = false;
  SelectedId: any;
  currentPageCategory: number = 1;
  isLoadingLabels: boolean = true;
  currentPageLabel: number = 1;
  labelsExpense: any;
  isAddingLabel: boolean = false;
  isDeletingExpense: boolean = false;
  isModalVisible1: boolean = false;
  isModalVisible2: boolean = false;
  isModalVisible3: boolean = false;
  fileList: NzUploadFile[] = [];
  processing: boolean = false;
  savedBinaryData: { [key: string]: ArrayBuffer } = {}; // Ensure initialization
  Object: any;
  currentPage: number = 1;
  fileExpensesEdit: any;
  currentSelecedExpenses: any;
  isMobileScreen = window.innerWidth <= 768; // Adjust the breakpoint as needed

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const target = event.target as Window;
    this.isMobileScreen = target.innerWidth <= 768;
  }



  constructor(
    private fb: FormBuilder,
    private _ExpensesService: ExpensesService,
    private message: NzMessageService,
    private _ExpensesLabelsService : ExpensesLabelsService,
  ) {}





  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = [];
    this.fileList = this.fileList.concat(file); // Add file to the file list
    this.saveFileAsBinary(file as unknown as File); // Automatically save the file as binary
    return false; // Prevent auto-upload
  };

  changePageExpenses($event: number) {
    this.currentPage = $event;
    this.getExpensesMutation.mutate();
}

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
      this.processing = false;
    };

    reader.readAsArrayBuffer(file); // Read file as binary
  }

  // Mutations
  getCategoriesMutation = injectMutation((client: any) => ({
    mutationFn: () => {
      // Call the service to fetch categories
      return this._ExpensesService.getAllCategories({ page : this.currentPageCategory});
    },
    onMutate: () => {
      // Set loading state when mutation starts
      this.isLoadingCategories = true;
    },
    onSuccess: (data: any) => {
      // Update the local state with fetched categories
      this.categoriesExpense = data;

      // Reset loading state after success
      this.isLoadingCategories = false;

      // Optionally invalidate the cache or trigger updates
      client.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error) => {
      // Reset loading state and handle the error
      this.isLoadingCategories = false;
      this.message.error('Erreur lors du chargement des catégories');
    }
  }));
  getExpensesMutation = injectMutation((client: any) => ({
    mutationFn: () => {
      return this._ExpensesService.getAll({page : this.currentPage});
    },
    onMutate: () => {
      this.isLoadingExpense = true;
    },
    onSuccess: (data: any) => {
      this.Expenses = data;
      this.isLoadingExpense = false;
      client.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error) => {
      this.isLoadingExpense = false;
      this.message.error('Erreur lors du chargement des catégories');
    }
  }));
  addCategoryMutation = injectMutation(() => ({
    mutationFn: (data: any) => this._ExpensesService.createCategory(data),
    onMutate: () => {
      this.isLoadingCategoryDepense = true;
      this.message.info('Ajout de la catégorie en cours...');
    },
    onSuccess: () => {
      this.isLoadingCategoryDepense = false;
      this.message.success('Catégorie ajoutée avec succès');
      this.formCategory.reset();
      this.getCategoriesMutation.mutate();
    },
    onError: () => {
      this.isLoadingCategoryDepense = false;
      this.message.error('Échec de l\'ajout de la catégorie');
    }
  }));
  deleteCategoryMutation = injectMutation(() => ({
    mutationFn: () => this._ExpensesService.deleteCategory(this.SelectedId),
    onMutate: () => {
      this.isDeletingCategory = true;
      this.message.info('Suppression de la catégorie en cours...');
    },
    onSuccess: () => {
      this.isDeletingCategory = false;
      this.message.success('Catégorie supprimée avec succès');
      this.getCategoriesMutation.mutate(); // Refresh the list of categories
      this.handleDeleteModalCancel();
    },
    onError: (error :any) => {
      this.isDeletingCategory = false;
      this.message.error('Échec de la suppression de la catégorie' + error.error.message);
    }
  }));
  addExpenseMutation = injectMutation(() => ({
    mutationFn: (data: any) => this._ExpensesService.create(data),
    onMutate: () => {
      this.isLoadingAddExpense = true;
      this.message.info('Ajout de la dépense en cours...');
    },
    onSuccess: () => {
      this.isLoadingAddExpense = false;
      this.message.success('Dépense ajoutée avec succès');
      this.expenseForm.reset();
      this.getExpensesMutation.mutate(); // Assuming you have a similar mutation to fetch expenses
      this.isModalVisible3 = false;
      this.fileList = [];
    },
    onError: () => {
      this.isLoadingAddExpense = false;
      this.message.error('Échec de l\'ajout de la dépense');
    }
  }));
  getExpenseLabelsMutation = injectMutation((client: any) => ({
    mutationFn: () => {
      // Call the service to fetch expense labels
      return this._ExpensesLabelsService.getAll({ page: this.currentPageLabel });
    },
    onMutate: () => {
      // Set loading state when mutation starts
      this.isLoadingLabels = true;
    },
    onSuccess: (data: any) => {
      // Update the local state with fetched labels
      this.labelsExpense = data;

      // Reset loading state after success
      this.isLoadingLabels = false;

      // Optionally invalidate the cache or trigger updates
      client.invalidateQueries({ queryKey: ['labels'] });
    },
    onError: (error) => {
      // Reset loading state and handle the error
      this.isLoadingLabels = false;
      this.message.error('Erreur lors du chargement des étiquettes');
    }
  }));
  addLabelMutation = injectMutation((client: any) => ({
    mutationFn: (newLabel: any) => {
      // Call the service to add a new label
      return this._ExpensesLabelsService.create(newLabel);
    },
    onMutate: () => {
      // Set loading state when mutation starts
      this.isAddingLabel = true;
    },
    onSuccess: (data: any) => {
      this.getExpenseLabelsMutation.mutate()

      // Show success message to the user
      this.message.success('Dépense ajoutée avec succès');
      this.isAddingLabel = false;
      // Invalidate queries to refresh labels list
      client.invalidateQueries({ queryKey: ['labels'] });
    },
    onError: (error) => {
      // Reset loading state and handle the error
      this.isAddingLabel = false;
      this.message.error('Erreur lors de l’ajout de l’étiquette');
    }
  }));
  EditLabelMutation = injectMutation((client: any) => ({
    mutationFn: (expenes: any) => {
      return this._ExpensesService.update( this.currentSelecedExpenses.id , expenes);
    },
    onMutate: () => {
      // Set loading state when mutation starts
      this.isAddingLabel = true;
    },
    onSuccess: (data: any) => {
      this.getExpenseLabelsMutation.mutate()

      // Show success message to the user
      this.message.success('Dépense modifié avec succès');
      this.isAddingLabel = false;
      // Invalidate queries to refresh labels list
      client.invalidateQueries({ queryKey: ['labels'] });
    },
    onError: (error) => {
      // Reset loading state and handle the error
      this.isAddingLabel = false;
      this.message.error('Erreur lors de l’ajout de l’étiquette');
    }
  }));
  deleteExpenseMutation = injectMutation((client: any) => ({
    mutationFn: () => {
      return this._ExpensesService.delete(this.selectedId); // Assumes your service has a `delete` method
    },
    onMutate: () => {
      this.isDeletingExpense = true;
    },
    onSuccess: () => {
      this.isDeletingExpense = false;
      this.message.success('Dépense supprimée avec succès');
      this.isDeleteModalExpensesOpen = false;
      this.getExpensesMutation.mutate()
      client.invalidateQueries({ queryKey: ['expenses'] }); // Refresh the expense list
    },
    onError: () => {
      this.isDeletingExpense = false;
      // this.message.error('Échec de la suppression de la dépense');
      this.isDeleteModalExpensesOpen = false;
      this.getExpensesMutation.mutate()

      this.message.success('Dépense supprimée avec succès');
      client.invalidateQueries({ queryKey: ['expenses'] }); // Refresh the expense list
    }
  }));

  deleteLabelExpenseMutation = injectMutation((client: any) => ({
    mutationFn: () => {
      return this._ExpensesService.deleteLabel(this.SelectedId); // Assumes your service has a `delete` method
    },
    onMutate: () => {
      this.isDeletingExpense = true;
    },
    onSuccess: () => {
      this.isDeletingExpense = false;
      this.message.success('Label supprimée avec succès');
      this.isDeleteModalExpensesOpen = false;
      this.isOpenDeleteModal = false;
      this.getExpenseLabelsMutation.mutate()
      client.invalidateQueries({ queryKey: ['expenses'] }); // Refresh the expense list
    },
    onError: () => {
      this.isDeletingExpense = false;
      this.isDeleteModalExpensesOpen = false;
      this.getExpenseLabelsMutation.mutate()

      this.message.success('Label supprimée avec succès');
      client.invalidateQueries({ queryKey: ['expenses'] }); // Refresh the expense list
    }
  }));





  deleteCategory(id: string , LabelOrCate : number): void {
    this.deletingCategories = LabelOrCate
    this.SelectedId = id;
    this.isOpenDeleteModal = true;
  }


  submitFormCategory(): void {
    if (this.formCategory.valid) {
      const formData = {
        name: this.formCategory.value.name,
        type: this.formCategory.value.type
      };
      this.addCategoryMutation.mutate(formData);
    } else {
      this.message.warning('Veuillez remplir tous les champs requis.');
    }
  }
  submitFormLabel() {
    if (this.formAddLabel.valid) {
      this.addLabelMutation.mutate(this.formAddLabel.value);
    } else {
      this.message.warning('Veuillez remplir tous les champs requis.');
    }
  }

  openDeleteModalExpenses(expenseId: any): void {
    this.selectedId = expenseId;
    this.isDeleteModalExpensesOpen = true; // Open the delete modal
  }
  editMode : boolean = false;
  openEditExpenses(expenses : any) {
    this.currentSelecedExpenses = expenses;
    if (expenses.expense_file ) {
      this.fileExpensesEdit = expenses.expense_file
    }
    this.editMode = true ;
    this.isModalVisible3 = true;
    this.expenseForm.patchValue(expenses)
  }

  handleDeleteModalCancelExpense(): void {
    this.isDeleteModalExpensesOpen = false; // Close the delete modal
  }

  cancelDeleteModalExpense(): void {
    this.isDeleteModalExpensesOpen = false; // Close the delete modal
  }

  confirmDeleteExpense(): void {
    if (!this.selectedId) {
      return;
    }

    this.deleteExpenseMutation.mutate();
  }



  getExpensesByMonth() {
    const expensesByMonth: {
      [key: string]: {
        [categoryName: string]: {
          total: number;
          expenses: any[];
        };
      };
    } = {};

    if (!this.Expenses?.data || this.Expenses.data.length === 0) {
      return null; // Return null if there are no expenses
    }

    this.Expenses.data.forEach((expense: any) => {
      const monthYear = new Date(expense.created_at).toLocaleString('default', { month: 'long', year: 'numeric' });
      const categoryName = expense.expense_label?.expense_category?.name || 'Uncategorized';

      if (!expensesByMonth[monthYear]) {
        expensesByMonth[monthYear] = {};
      }

      if (!expensesByMonth[monthYear][categoryName]) {
        expensesByMonth[monthYear][categoryName] = { total: 0, expenses: [] };
      }

      expensesByMonth[monthYear][categoryName].expenses.push(expense);
      expensesByMonth[monthYear][categoryName].total += expense.amount;
    });

    return expensesByMonth;
  }


  groupByMonthAndCategory() {

    return this.Expenses?.data.reduce((result: any, expense: any) => {
      // Convert created_at to a Date object
      const date = new Date(expense.created_at);

      // Format date as "Month YYYY" (e.g., "Novembre 2024" for French locale)
      const month = new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long' }).format(date);

      const categoryName = expense.expense_label.expense_category.name;

      // Initialize the month group if it doesn't exist
      if (!result[month]) {
        result[month] = {};
      }

      // Initialize the category group within the month if it doesn't exist
      if (!result[month][categoryName]) {
        result[month][categoryName] = [];
      }

      // Add the expense to the appropriate category within the month
      result[month][categoryName].push(expense);

      return result;
    }, {});
  }


  /**
 * Helper function to convert ArrayBuffer to File
 * Handles all types of files without explicitly requiring a MIME type.
 *
 * @param arrayBuffer - The ArrayBuffer containing file data
 * @param filename - The desired name for the file
 * @returns A File object created from the ArrayBuffer
 */
convertArrayBufferToFile(arrayBuffer: ArrayBuffer, filename: string): File {
  // Validate input parameters
  if (!arrayBuffer) {
    throw new Error('ArrayBuffer is required.');
  }
  if (!filename) {
    throw new Error('Filename is required.');
  }

  // Create a Blob from the ArrayBuffer
  const blob = new Blob([arrayBuffer]);

  // Return a File object
  return new File([blob], filename);
}



AddExpense(): void {
  if (this.expenseForm.valid) {
    try {

      // Extract the first file from savedBinaryData
      const firstFileKey = Object.keys(this.savedBinaryData)?.[0];
      const arrayBuffer = firstFileKey ? this.savedBinaryData[firstFileKey] : null;

      // Prepare FormData
      const formData = new FormData();

      if (!this.editMode) {
        if (!arrayBuffer) {
          this.message.create('warning', "Le fichier est obligatoire");
          return;
        }

        // Convert ArrayBuffer to File
        const file = this.convertArrayBufferToFile(arrayBuffer, firstFileKey);
        formData.append("expense_file", file);
      } else {
        if (this.fileExpensesEdit && this.fileList.length === 0) {
        } else if (arrayBuffer) {
          // Only add the file if it's changed or not present in the list
          const file = this.convertArrayBufferToFile(arrayBuffer, firstFileKey);
          formData.append("expense_file", file);
        }
      }

      // Append other form data from expenseForm
      const formattedFormValue = this.expenseForm.value;
      for (const key in formattedFormValue) {
        if (formattedFormValue.hasOwnProperty(key)) {
          formData.append(key, formattedFormValue[key]);
        }
      }

      // Perform the mutation with FormData
      if (this.editMode) {
        this.EditLabelMutation.mutate(formData);
      } else {
        this.addExpenseMutation.mutate(formData);
      }
    } catch (error) {
    }
  } else {
    this.message.warning("Veuillez remplir les champs correctement");
    // Validate and mark invalid form controls
    Object.values(this.expenseForm.controls).forEach(control => {
      if (control.invalid) {
        control.updateValueAndValidity();
      }
    });
  }
}



  ngOnInit(): void {
    this.formCategory = this.fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });

    this.formAddLabel = this.fb.group({
      name: ['', [Validators.required]],
      expense_category_id: ['', [Validators.required]]
    });

    this.expenseForm = this.fb.group({
      expense_label_id: [null, [Validators.required]],
      amount: [null, [Validators.required, Validators.min(0)]]
    });


    this.getExpenseLabelsMutation.mutate();
    this.getCategoriesMutation.mutate();
    this.getExpensesMutation.mutate();
  }

  deletingCategories! : number ;

  handleDeleteModalCancel() {
    this.isOpenDeleteModal = false;
  }
  deleteCategoryComfirm() {
    if (this.deletingCategories == 1){
      this.deleteCategoryMutation.mutate(this.SelectedId)
    }else{
      this.deleteLabelExpenseMutation.mutate(this.SelectedId)
    }
  }
  changePage(page: number , LabelOrCate : number) {

      if(LabelOrCate == 1) {
        this.currentPageCategory = page;
        this.getCategoriesMutation.mutate();
      }else{
        this.currentPageLabel = page
        this.getExpenseLabelsMutation.mutate()
      }
  }




  showModal1(): void {
    this.isModalVisible1 = true;
  }
  showModal2(): void {
    this.isModalVisible2= true;
  }
  showModal3(): void {
    this.editMode = false ;
    this.fileList = [];
    this.expenseForm.reset();
    this.isModalVisible3= true;
  }

  handleCancel1(): void {
    this.isModalVisible1 = false;

  }
  handleCancel2(): void {

    this.isModalVisible2 = false;
  }
  handleCancel3(): void {

    this.isModalVisible3 = false;
  }
}
