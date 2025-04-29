import {Component, EventEmitter, Input, Output} from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-aide-modal',
  standalone: true,
  imports: [NzModalModule],
  templateUrl: './aide-modal.component.html',
  styleUrl: './aide-modal.component.css'
})
export class AideModalComponent {
  @Input() isVisible: boolean = false ;
  @Output() Close = new EventEmitter();

  handleClose() {
    this.Close.emit();
  }
}
