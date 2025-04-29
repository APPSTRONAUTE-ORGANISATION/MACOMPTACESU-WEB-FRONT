import { Component, ViewChild } from '@angular/core';
import { PageTemplateComponent } from '../../../../layouts/page-template/page-template.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CommonModule } from '@angular/common';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import {
  NzModalComponent,
  NzModalContentDirective,
  NzModalFooterDirective,
  NzModalTitleDirective
} from "ng-zorro-antd/modal";
import { Observable, Observer } from "rxjs";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { ComfirmModalComponent } from "../../../../shared/component/comfirm-modal/comfirm-modal.component";
import { injectMutation } from "@tanstack/angular-query-experimental";
import { ProfileService } from "../../../../data/services/profile/profile.service";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { environment } from "../../../../../environments/environment";
import { NzWaveDirective } from "ng-zorro-antd/core/wave";
import { SubscriptionService } from "../../../../data/services/subscription/subscription.service";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { NzInputDirective, NzInputGroupComponent, NzInputGroupWhitSuffixOrPrefixDirective } from "ng-zorro-antd/input";
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-settings-profile',
  standalone: true,
  imports: [PageTemplateComponent, TranslatePipe, CommonModule, NzTabsModule, NzSwitchModule, NzUploadModule, NzModalComponent, NzModalContentDirective, NzIconDirective, NzModalTitleDirective, NzModalFooterDirective, ReactiveFormsModule, ComfirmModalComponent, NzButtonComponent, NzWaveDirective, NzInputGroupWhitSuffixOrPrefixDirective, NzInputGroupComponent, NzInputDirective],
  templateUrl: './settings-profile.component.html',
  styleUrl: './settings-profile.component.css'
})
export class SettingsProfileComponent {
  tabs = [
    {
      name: 'Compte',
      disabled: false
    },
    {
      name: 'Abonnement',
      disabled: false
    }
    // {
    //   name: 'Outils',
    //   disabled: false
    // } ,
    // {
    //   name : 'Paiements en retard',
    //   disabled: false
    // }
  ];
  protected ModalEditImage: boolean = false;
  isUpdatingImageAvatar = false;
  isSaving: boolean = false;
  isOpenDeleteModal = false;
  protected currentUser = JSON.parse(localStorage.getItem('currentUser') || '')?.user;
  avatarUrl?: string = this.currentUser?.profile_image || '';
  form: FormGroup;
  isDeletingAvatar: boolean = false;
  ShowConfirmCancelDialog: boolean = false;
  protected readonly environment = environment;
  protected dataCard: any;
  protected isEditingCase = false;
  protected isChanged: boolean = false;

  subscriptionMutaion = injectMutation(() => ({
    mutationKey: ['subscription'],
    mutationFn: () => this._SubscriptionPlanService.getAll({}),
    onSuccess: (data: any) => {
      console.log(data?.stripe_history)
      this.dataCard = { ...this.currentUser, subscription: data?.stripe_history[0] };
      console.log(this.dataCard)
      if (this.currentUser.role == 'client'){
        this.cardInfoMutation.mutate();
      }
    }
  }));

  cardInfoMutation = injectMutation(() => ({
    mutationKey: ['subscription'],
    mutationFn: () => this._SubscriptionPlanService.getInfoUser(),
    onSuccess: (data: any) => {
      console.log(data?.stripe_history)
      this.dataCard = { ...this.dataCard, card: data };
      console.log(this.dataCard)
    }
  }));


  updateAvatarMutation = injectMutation((client) => ({
    mutationFn: () => this._ProfileService.RemoveImage(),
    onMutate: () => {
      this.isDeletingAvatar = true;
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['profile'] });
      this.isDeletingAvatar = false;
      this.handleCancel();

      let currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
      currentUser.user.profile_image = '';
      this.templateComponent.currentUser.user.profile_image = ''
      this.avatarUrl = ""
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      this.msg.create('success', 'L\'image a été supprimée avec succès');

    },
    onError: () => {
      this.isOpenDeleteModal = false;
      this.isDeletingAvatar = false;
      this.msg.create('error', 'Une erreur est survenue lors de la suppression de l\'image.');
    }
  }));


  UserIdPayload = {
    id: JSON.parse(localStorage.getItem('currentUser') || '').user.id
  };


  @ViewChild(PageTemplateComponent) templateComponent!: PageTemplateComponent;



  constructor(private http: HttpClient, private translate: TranslateService, private msg: NzMessageService, private _SubscriptionPlanService: SubscriptionService, private _ProfileService: ProfileService, private fb: FormBuilder, private notification: NzNotificationService) {

    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('fr');

    this.passwordForm = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatch } // Ensure validator is applied here
    );



    if (this.currentUser.role == 'admin') {
      this.tabs = [
        {
          name: 'Compte',
          disabled: false
        },

      ];
    } else {
      this.tabs = [
        {
          name: 'Compte',
          disabled: false
        },
        {
          name: 'Abonnement',
          disabled: false
        }
        // {
        //   name: 'Outils',
        //   disabled: false
        // } ,
        // {
        //   name : 'Paiements en retard',
        //   disabled: false
        // }
      ];
    }
    this.form = this.fb.group({
      first_name: [{ value: "", disabled: !this.isEditingCase }, Validators.required,],
      last_name: [{ value: "", disabled: !this.isEditingCase }, Validators.required],
      phone: [{ value: "", disabled: !this.isEditingCase }, Validators.required],
      email: [{ value: "", disabled: !this.isEditingCase }, Validators.required],
    })
    this.form.patchValue(this.currentUser)
    this.form.valueChanges.subscribe(() => {
      this.isChanged = true;
    });

    this.dataCard = { ...this.currentUser }//for testing

    this.subscriptionMutaion.mutate();

  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('Vous pouvez uniquement téléverser des fichiers JPG !');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error("L'image doit être inférieure à 2 Mo !");
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {

    switch (info.file.status) {
      case 'uploading':
        this.isUpdatingImageAvatar = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.isUpdatingImageAvatar = false;
          this.avatarUrl = img;

          if (localStorage.getItem('currentUser')) {
            let currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
            currentUser.user.profile_image = img;
            this.templateComponent.currentUser.user.profile_image = img;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            this.ModalEditImage = false;
          }

        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.isUpdatingImageAvatar = false;
        break;
    }
  }


  ShowModalUploadImage() {
    this.ModalEditImage = true;
  }

  handleCancel() {
    this.ModalEditImage = false;
    this.isOpenDeleteModal = false;

  }

  changeModeEditing() {
    this.isEditingCase = !this.isEditingCase; // Toggle editing mode

    if (this.isEditingCase) {
      this.notification.blank(
        'Alert !',
        'Faites les changements après avoir cliqué sur Save',
        { nzPlacement: "topRight", nzDuration: 2000 }
      );
      this.form.enable(); // Enable all fields
    } else {
      // Check if there are unsaved changes
      if (!this.areSharedKeysEqual(this.currentUser, this.form.value)) {
        this.ShowConfirmCancelDialog = true; // Show confirmation dialog
      } else {
        this.handleCancelDialog();
      }
    }

    // Optionally, you might want to log whether there are changes
    if (!this.isEditingCase && !this.ShowConfirmCancelDialog) {
    } else if (!this.isEditingCase) {
    }
  }

  areSharedKeysEqual(obj1: any, obj2: any): boolean {
    // Check if both are the same reference
    if (obj1 === obj2) return true;

    // Check if both are objects
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
      return false;
    }

    // Get shared keys
    const sharedKeys = Object.keys(obj1).filter(key => key in obj2);

    // Compare only shared keys
    for (const key of sharedKeys) {
      if (obj1[key] !== obj2[key]) {
        return false; // Values differ for the shared key
      }
    }

    return true; // All shared keys are equal
  }

  handleCancelDialog() {
    this.ShowConfirmCancelDialog = false;
    this.isEditingCase = false;
    this.form.patchValue(this.currentUser)
    this.form.disable();
  }
  HandleComfirmDialog() {

    if (this.areSharedKeysEqual(this.currentUser, this.form.value)) {
      this.ShowConfirmCancelDialog = false;
      this.form.patchValue(this.currentUser)
      this.form.disable();
    } else {
      this.isSaving = true

    }
  }


  HandleComfirmDelete() {
    this.updateAvatarMutation.mutate();
  }


  passwordForm: FormGroup;



  // Custom validator for checking password match
  passwordsMatch(formGroup: AbstractControl): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password && confirmPassword && password !== confirmPassword
      ? { passwordsMismatch: true }
      : null;
  }


  changePassword() {
    if (this.passwordForm.valid) {
      const formData = this.passwordForm.value; // Assuming the form has the required data fields
      let token = JSON.parse(localStorage.getItem('currentUser') || '').token;
      // Make the POST request
      this.http.post('https://back.macomptacesu.com/api/update_password', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .subscribe(
          (response: any) => {
            this.passwordForm.reset()
            this.msg.success("password updated successfully");
          },
          (error: any) => {
          }
        );
    }
  }
}
