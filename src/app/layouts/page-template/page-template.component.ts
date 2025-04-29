import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { FormsModule } from '@angular/forms';
import {AideModalComponent} from "../../shared/component/aide-modal/aide-modal.component";
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { InvoicesService } from '../../data/services/invoices/invoices.service';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-page-template',
  standalone: true,
  imports: [NzToolTipModule , NzLayoutModule,TranslatePipe, CommonModule, RouterModule,NzPopoverModule, FormsModule, AideModalComponent , NzCarouselModule],
  templateUrl: './page-template.component.html',
  styleUrl: './page-template.component.css'
})
export class PageTemplateComponent implements OnInit {

  @Input() titleNavbar : string = '';
  @Input() seachbar : boolean = true;
  @Input() sideIconPath : string = '';
  @Output() SearchValue = new EventEmitter<string>();
  protected SearchQuery : string  = ""
  protected isCollapsed : any = false;
  protected AideModal : boolean = false;
  currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  protected isLoading: boolean = false;
  protected Invoicesloading : boolean = true; 
  invoices: any;
  constructor(private router : Router , private _InvoicesService : InvoicesService ) {
    // this.InvoicesMutation.mutate()
  }

  InvoicesMutation = injectMutation(() => ({
    mutationKey: ['invoices', 'all'],
    mutationFn: () => this._InvoicesService.getAllNotifications({page :1 , perpage : 6 }),
    onMutate: () => {
      this.Invoicesloading = true;
    },
    onSuccess: (data: any) => {
      this.Invoicesloading = false;
      this.invoices = data;
    },
    onError: (err: any) => {
      this.Invoicesloading = false;
    },
  }));

  ngOnInit(): void {
    const storedValue = localStorage.getItem('isCollapsed');
    this.isCollapsed = storedValue;
    if (storedValue === 'true') {
      this.isCollapsed = true;
    } else {
      this.isCollapsed = false;
    }
  }

  HandleColapsed() {
    this.isCollapsed = !this.isCollapsed
    localStorage.setItem('isCollapsed', this.isCollapsed.toString());
  }

  Search() {
    this.SearchValue.emit(this.SearchQuery);
  }

  OpenAideModal() {
    this.AideModal = true;
  }

  HandleEmptyCaseSearching() {
    if (this.SearchQuery.length == 0) {
      this.SearchValue.emit(this.SearchQuery);
    }
  }

  logOut() {
    this.isLoading = true ;
    localStorage.clear();
    setTimeout(()=> {

      this.router.navigate(['/auth/login']);
    } , 3000)
  }
}
