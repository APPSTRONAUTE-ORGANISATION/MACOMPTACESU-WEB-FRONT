import { Component, HostListener } from '@angular/core';
import { PageTemplateComponent } from "../../../../layouts/page-template/page-template.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { NzCollapseComponent, NzCollapsePanelComponent } from "ng-zorro-antd/collapse";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {injectMutation, injectQuery, injectQueryClient} from "@tanstack/angular-query-experimental";
import { SupportService } from "../../../../data/services/Support/support.service";
import { NzMessageService } from "ng-zorro-antd/message";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {
  NzTableCellDirective,
  NzTableComponent,
  NzTbodyComponent,
  NzTheadComponent,
  NzThMeasureDirective, NzTrDirective
} from "ng-zorro-antd/table";
import {NzTagComponent} from "ng-zorro-antd/tag";
import {NzTooltipDirective} from "ng-zorro-antd/tooltip";
import {NzDrawerComponent, NzDrawerContentDirective} from "ng-zorro-antd/drawer";
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import {  TranslatePipe, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-support',
  standalone: true,
  imports: [
    PageTemplateComponent,
    TranslatePipe,
    FormsModule,
    ReactiveFormsModule,
    NzCollapsePanelComponent,
    NzCollapseComponent,
    NgIf,
    NzEmptyModule,
    NzCollapseModule,
    NzIconModule,
    NzPaginationComponent,
    NzTableCellDirective,
    NzTableComponent,
    NzTagComponent,
    NzTbodyComponent,
    NzThMeasureDirective,
    NzTheadComponent,
    NzTooltipDirective,
    NzTrDirective,
    NgForOf,
    NzDrawerComponent,
    NzDrawerContentDirective,
    DatePipe,
  ],
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'] // Fixed styleUrls to be plural
})
export class SupportComponent {
  form!: FormGroup;
  protected isSendingSupport: boolean = false;
  protected currentUser  = JSON.parse(localStorage.getItem('currentUser') || '')?.user;
  protected currentPage: number = 1;
  protected searchValue: string = '';
  queryClient = injectQueryClient();
  protected selectedData: any;
  protected isOpenDetailsDraw: boolean = false;
  readonly panels: any[] = [
    {
      active: false,
      disabled: false,
      name: "Qu'est-ce que MaComptaCESU ?",
      icon: "custom-icon-class",
      content:
        "MaComptaCESU est un outil complet et intuitif, spécialement conçu pour gérer vos finances personnelles et professionnelles en tant qu'employé CESU ou micro-entrepreneur. Grâce à cette application web, vous pouvez suivre vos revenus, dépenses et patrimoine de manière claire et détaillée.",
    },
    {
      active: false,
      disabled: false,
      name: "Quels sont les avantages à utiliser MaComptaCESU par rapport à une gestion classique ?",
      icon: "custom-icon-class",
      content:
        "MaComptaCESU vous permet de gagner un temps précieux tout en réduisant le risque d'erreurs grâce à l'automatisation de vos calculs. Il inclut également un carnet clients toujours à jour, où vous conservez une trace précise de vos clients avec leurs coordonnées et leurs paiements. Enfin, MaComptaCESU vous permet d’ajouter des notes personnalisées à chaque client, pour ne rien oublier, que ce soit des préférences spécifiques, des demandes particulières ou des points à améliorer. En utilisant MaComptaCESU, vous simplifiez votre gestion au quotidien tout en restant parfaitement organisé.",
    },
    {
      active: false,
      disabled: false,
      name: "Est-ce que MaComptaCESU fonctionne sur mon smartphone et ma tablette ?",
      icon: "custom-icon-class",
      content:
        "Oui, MaComptaCESU est une application web responsive, ce qui signifie que vous pouvez y accéder depuis n'importe quel appareil connecté à Internet.",
    },
    {
      active: false,
      disabled: false,
      name: "Proposez-vous des sauvegardes et des options de récupération de données ?",
      icon: "custom-icon-class",
      content:
        "Oui, vos données sont sauvegardées régulièrement pour garantir leur sécurité et éviter toute perte.",
    },
    {
      active: false,
      disabled: false,
      name: "Comment nous contacter ?",
      icon: "custom-icon-class",
      content: `
        Vous avez une question ou besoin d'aide pour utiliser MaComptaCESU ? Notre équipe est là pour vous accompagner !<br />
        📧 Email : <a href="mailto:support@macomptacesu.com" class="text-blue-500 underline">support@macomptacesu.com</a><br />
        Envoyez-nous un message à tout moment, et nous vous répondrons dans les plus brefs délais.
        <ul>
          <li>Répondre à vos questions sur l’utilisation de l’outil.</li>
          <li>Vous guider dans l’installation ou l’importation de vos données.</li>
          <li>Résoudre tout problème technique.</li>
          <li>Recueillir vos suggestions pour améliorer MaComptaCESU.</li>
        </ul>
        N'hésitez pas à nous contacter, nous sommes là pour vous aider !
      `,
    },
  ];

  readonly customStyle = {
    background: '#ffffff',
    'border-radius': '0',
    'border-bottom': '2px solid #CBD5E1', // Add solid style and a color
    border: '0px',
  };
  isMobileScreen = window.innerWidth <= 768; // Adjust the breakpoint as needed

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const target = event.target as Window;
    this.isMobileScreen = target.innerWidth <= 768;
  }

  constructor(private translate : TranslateService,  private fb: FormBuilder, private _SupportService: SupportService, private message: NzMessageService) {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('fr');

    this.form = this.fb.group({
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

   query = injectQuery<any>(() => ({
     queryKey: ['support', "report" , this.currentPage],
     queryFn: () => this._SupportService.getAll({ page: this.currentPage, search: this.searchValue }),
     staleTime: 60000,
     cacheTime: 60000,
   }));

  addSupportTicketMutation = injectMutation((supportTicket: any) => ({
    mutationFn: (data: any) => this._SupportService.create(data),
    onSuccess: () => {
      this.isSendingSupport = false;
      this.message.create("Ticket de support créé", "Votre ticket de support a été créé avec succès.");
      this.form.reset();
    },
    onError: () => {
      this.isSendingSupport = false;
      this.message.create("Erreur", "Une erreur s'est produite lors de la création de votre ticket de support. Veuillez réessayer.");
    },
    onMutate: () => {
      this.isSendingSupport = true;
    },
  }));

  OnSubmit(): void {
    this.addSupportTicketMutation.mutate(this.form.value);
  }

  changePage($event: number) {
    this.currentPage = $event;
    this.queryClient.invalidateQueries({ queryKey: ['support', 'report', this.currentPage] });
  }

  setSearchValue($event: string) {
    this.searchValue = $event;
    this.queryClient.invalidateQueries({ queryKey: ['support', 'report', this.currentPage] });
  }

  openDraw(item: any) {
    this.selectedData = item;
    this.isOpenDetailsDraw = true;
  }
}
