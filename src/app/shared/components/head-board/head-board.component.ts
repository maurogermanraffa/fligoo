import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'fligoo-head-board',
  styleUrls: ['./head-board.component.scss'],
  templateUrl: './head-board.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadboardComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
}
