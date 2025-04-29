
import { Component, HostListener, Input, OnInit, inject } from '@angular/core';
import { PageTemplateComponent } from "../../../../layouts/page-template/page-template.component";
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../../../data/services/users/users.service';
import { injectMutation, injectQuery, injectQueryClient } from '@tanstack/angular-query-experimental';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { environment } from '../../../../../environments/environment.development';
import { saveAs } from 'file-saver';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import {Router} from "@angular/router";
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio'; // Import NzRadioModule
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-users',
  standalone: true,
  imports: [PageTemplateComponent,TranslatePipe,NzSelectModule,NzEmptyModule,NzRadioModule,  NzPaginationModule,NzDrawerModule , NzTagModule,NzToolTipModule, NzButtonModule, NzSwitchModule, NzPopoverModule, ReactiveFormsModule, NzModalModule, NzTabsModule, CommonModule, NzTableModule, NzDropDownModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  isMobileScreen = window.innerWidth <= 768; // Adjust the breakpoint as needed

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const target = event.target as Window;
    this.isMobileScreen = target.innerWidth <= 768;
  }


  constructor( private translate : TranslateService,private notification: NzNotificationService, private fb: FormBuilder, private _UserService: UsersService, private http: HttpClient, private modal: NzModalService, private exportingModal: NzModalService, private message: NzMessageService , private router : Router) {

    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('fr');

  }
  currentPage: any = 1;
  isOpenDeleteModal = false;
  isLoadingUsers: boolean = false;
  SelectedData :any;
  detailsUserDrawer  : boolean = false
  isEditMode: boolean = false;
  formData: any;
  form!: FormGroup;
  isAddClientModalVisible = false;
  isAddingClient = false;
  switchValue = false;
  isChangingStatusUser = false;
  confirmModal?: NzModalRef;
  togle: boolean = false;
  isDeletingUser : boolean = false;
  queryClient = injectQueryClient();
  users: any[] = [];
  tabs = [{
    id: 1,
    name: 'Informations clients',
  }, {
    id: 2,
    name: 'Total clients',
  },];

  searchValue = '';
  visible = false;

  roles = [
    { value: 'client', label: 'Client' },
    { value: 'admin', label: 'Admin' }
  ];

  // Fetch users with cache and staleTime options
  query = injectMutation<any>(() => ({
    mutationKey: ['users', this.currentPage], // Include page and pageSize in the query key
    mutationFn: () => this._UserService.getAll({ page: this.currentPage, search: this.searchValue }),
    staleTime: 60000, // 1 minute before data is considered stale
    cacheTime: 60000, // Cache data for 1 minute,
    onMutate : () => {
      this.isLoadingUsers = true;
    } ,
    onSuccess : (data : any) => {
      this.users = data;
      this.isLoadingUsers = false;
    },
    onError : (error : any) => {
      this.isLoadingUsers = false;
    }
  }));

  // Add new user mutation
  addUserMutation = injectMutation((client: any) => ({
    mutationFn: (data: any) => this._UserService.create(data),
    onMutate:() => {
      this.isAddingClient = true;

    },
    onSuccess: () => {
      this.query.mutate()
      this.isAddingClient = false;

    },
    onError :() => {
      this.isAddingClient = false;
    }
  }));

  // Update user mutation
  updateUserMutation = injectMutation((client) => ({
    onMutate:() => {
      this.isAddingClient = true;

    },
    mutationFn: (user: any) => this._UserService.update(user.id, user),
    onSuccess: () => {
      this.query.mutate()
      this.isAddingClient = false;
    },
    onError :() => {
      this.isAddingClient = false;
    }
  }));

  // Delete user mutation
  deleteUserMutation = injectMutation((client) => ({
    mutationFn: (userId: number) => this._UserService.delete(userId),
    onSuccess: () => {
      this.query.mutate()
    },
  }));

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      country: [''],
      phone: [''],
      job: [''],
      email: ['', [Validators.required, Validators.email]],
      note: [''],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8), // Ensure a minimum of 8 characters
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ), // Pattern for strong password
        ],
      ],
      active: [null],
    });
    this.query.mutate();
  }

  OpenDrawerDetails(data: any) {
    console.log(data)
    //this.detailsUserDrawer = true;
    this.router.navigate(['/users/'+data.id])
    this.formData = data;
    console.log(this.formData);
  }

  changePage($event: number) {
    console.log($event)
    this.currentPage = $event;
    this.query.mutate();

  }
  createMessage(type: string, Message: string): void {
    this.message.create(type, Message);
  }

  reset(): void {
    this.searchValue = '';
  }

  search(searchQuery: any): void {
    this.currentPage = 1;
    this.searchValue = searchQuery;
    this.query.mutate();

  }

  export(format: string) {
    // Show initial loading message
    this.message.loading('Action in progress').onClose!.subscribe(() => {
      console.log('Loading message displayed.');
    });

    const endpoint = format === 'PDF' ? 'export_pdf' : 'export_excel';
    const url = `${environment.serverUrl}/users/${endpoint}`;

    this.http.get(url, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        // File download logic
        const fileType = format === 'PDF' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const fileName = format === 'PDF' ? 'exported_data.pdf' : 'exported_data.xlsx';

        saveAs(new Blob([response], { type: fileType }), fileName);

        // Show success message and close modal
        this.message.success('Data export successful!');
        this.exportingModal.closeAll();
      },
      (error) => {
        // Handle error
        console.error('Error fetching data:', error);
        this.message.error('Data export failed. Please try again.');
        this.exportingModal.closeAll();
      }
    );
  }

  DeleteUser(data: any): void {
    console.log(data);
    this.isOpenDeleteModal = true
    this.SelectedData = data;
    // this.confirmModal = this.modal.confirm({
    //   nzTitle: 'Voulez-vous supprimer cet élément ?',
    //   nzContent: "Si vous cliquez sur 'Oui', il sera définitivement supprimé",
    //   nzOnOk: () =>
    //     new Promise((resolve, reject) => {
    //       setTimeout(() => {
    //         this.deleteUserMutation.mutate(data.id, {
    //           onSuccess: () => {
    //             this.createMessage('success', 'Utilisateur a été bien supprimé');
    //             resolve(true);
    //           },
    //           onError: (error) => {
    //             console.error('Error while deleting user:', error);
    //             this.createMessage('error', 'Échec de la suppression de l\'utilisateur');
    //             reject(false);
    //           },
    //         });
    //       }, 1000);
    //     }).catch(() => console.log('Oops, there was an error!'))
    // });
    // }
  }
  HandleComfirmDelete(){
    this.isDeletingUser = true
    this.deleteUserMutation.mutate(this.SelectedData.id, {
      onSuccess: () => {
        this.createMessage('success', 'Utilisateur a été bien supprimé');
        this.isDeletingUser = false
        this.isOpenDeleteModal = false;
      },
      onError: (error) => {
        console.error('Error while deleting user:', error);
        this.createMessage('error', 'Échec de la suppression de l\'utilisateur');
        this.isDeletingUser = false

      },
    });
  }
  showModalEdit(data: any) {
    this.formData = data;
    console.log(data)
    this.isAddClientModalVisible = true;
    this.isEditMode = true;
    this.form.patchValue(this.formData);
  }
  showModal(): void {
    this.form.reset();
    this.isAddClientModalVisible = true;
    this.isEditMode = false;
  }
  showEditModal(): void {
    this.isAddClientModalVisible = true;
    this.isEditMode = true;
  }
  handleOk(): void {

    console.log(this.form.value);

    const handleSuccessMessage = () => {
      this.createMessage('success', 'Bien effectuée');
      this.form.reset();
      this.isAddClientModalVisible = false; // Close the modal only on success
      this.isAddingClient = false;
    };

    const handleErrorMessage = (error: any) => {

      console.log(error.error.errors)
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
            } else if (message === 'The email has already been taken.') {
              errors += 'Cette adresse email est déjà existe.\n';
            }
            else {
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


    if (true) {
      this.isAddingClient = false; // Stop the loading indicator on error

      if (this.isEditMode) {
        this.updateUserMutation.mutate(this.form.value, {
          onSuccess: () => {
            handleSuccessMessage();
          },
          onError: (error) => {
            handleErrorMessage(error);
          },
        });
      } else {
        this.addUserMutation.mutate(this.form.value, {
          onSuccess: () => {
            handleSuccessMessage();
          },
          onError: (error) => {
            handleErrorMessage(error);
          },
        });
      }
    } else {
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
    this.isOpenDeleteModal = false
  }
  ChangeStatusUser(data: any): void {
    console.log(data)
    this.isChangingStatusUser = true;
    const updatedData = { ...data, active: !data.active };

    this.updateUserMutation.mutate(updatedData, {
      onSuccess: () => {
        this.createMessage('success', 'Statut mis à jour avec succès.');
      },
      onError: (error) => {
        this.createMessage('error', error.message || 'Une erreur est survenue. Veuillez réessayer.');
      },
      onSettled: () => {
        this.isChangingStatusUser = false;
      },
    });
  }

}
