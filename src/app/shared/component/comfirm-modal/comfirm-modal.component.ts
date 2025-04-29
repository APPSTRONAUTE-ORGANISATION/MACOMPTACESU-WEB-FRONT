import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {NzModalComponent} from "ng-zorro-antd/modal";
import {NzButtonComponent} from "ng-zorro-antd/button";

@Component({
  selector: 'app-comfirm-modal',
  standalone: true,
  imports: [
    NzModalComponent,
    NzButtonComponent
  ],
  templateUrl: './comfirm-modal.component.html',
  styleUrl: './comfirm-modal.component.css'
})
export class ComfirmModalComponent {
  @Input() isVisible = false;
  @Input() titleTemplate!: TemplateRef<void>;
  @Input() contentTemplate!: TemplateRef<void>;
  @Input() isloading: boolean = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  handleCancel(): void {
    this.cancel.emit();
  }

  handleConfirmDelete(): void {
    this.confirm.emit();
  }

}
