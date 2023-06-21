import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'fligoo-buttons',
  styleUrls: ['./buttons.component.scss'],
  templateUrl: './buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsComponent {
  @Input() disabledOnSaveBtn!: boolean;
  @Output() onSaveBtn = new EventEmitter<null>()
  @Output() onPreviousPageBtn = new EventEmitter<null>()
  @Output() onDeleteBtn = new EventEmitter<null>()

  onSave(): void {
    this.onSaveBtn.emit();
  }

  onPreviousPage(): void {
    this.onPreviousPageBtn.emit();
  }

  onDelete(): void {
    this.onDeleteBtn.emit();
  }
}

