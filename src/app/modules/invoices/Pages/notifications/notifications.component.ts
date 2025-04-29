// notifications.component.ts
import { Component, HostListener, inject } from '@angular/core';
import { PageTemplateComponent } from "../../../../layouts/page-template/page-template.component";
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { InvoicesService } from '../../../../data/services/invoices/invoices.service';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    PageTemplateComponent,
    NzTableModule,
    NzPopoverModule,
    NzPaginationModule,
    CommonModule,
  ],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent {
  private invoicesService = inject(InvoicesService);

  // Properties for managing state
  currentPage = 1;
  searchValue = '';
  invoices: any;
  isLoadingUsers = false;
  isMobileScreen = window.innerWidth <= 768; // Adjust the breakpoint as needed

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const target = event.target as Window;
    this.isMobileScreen = target.innerWidth <= 768;
  }  constructor (){
    this.GetInvociesNotifications.mutate()
  }

  // Mutation for fetching invoice notifications
  GetInvociesNotifications = injectMutation<any>(() => ({
    mutationKey: ['invoices', this.currentPage],
    mutationFn: () =>
      this.invoicesService.getAll({ page: this.currentPage, search: this.searchValue }),
    staleTime: 60000, // 1 minute before data is considered stale
    cacheTime: 60000, // Cache data for 1 minute
    onMutate: () => {
      this.isLoadingUsers = true;
    },
    onSuccess: (data: any) => {
      this.invoices = data.data;
      this.isLoadingUsers = false;
    },
    onError: () => {
      this.isLoadingUsers = false;
    },
  }));

}
