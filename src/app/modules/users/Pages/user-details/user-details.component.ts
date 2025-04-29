import {Component, OnInit} from '@angular/core';
import {PageTemplateComponent} from "../../../../layouts/page-template/page-template.component";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {UsersService} from "../../../../data/services/users/users.service";
import {injectQuery} from "@tanstack/angular-query-experimental";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {NzTagComponent} from "ng-zorro-antd/tag";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-details',
  standalone: true,
    imports: [
        PageTemplateComponent,
        TranslatePipe,
        DatePipe,
        NgIf,
        FormsModule,
        NgForOf,
        NzPaginationComponent,
        NzTagComponent
    ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  private userId: any = null;
  constructor(private translate : TranslateService , private _UserService : UsersService , private route : ActivatedRoute) {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('fr');

    this.userId = Number(this.route.snapshot.params['id']);
  }

  GetUserDetailsQuery =  injectQuery<any>(() => ({
      queryKey: ['users' , 'details' , this.userId],
      queryFn: () => this._UserService.getById(this.userId),
    }));

  changePage($event: number) {
    
  }
}
