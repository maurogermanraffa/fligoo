import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from 'src/app/pages/users/interfaces/users.interfaces';

@Component({
  selector: 'fligoo-card',
  styleUrls: ['./card.component.scss'],
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() user!: User;
}
