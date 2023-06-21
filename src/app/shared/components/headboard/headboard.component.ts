import { Component, Input } from '@angular/core';

@Component({
  selector: 'fligoo-headboard',
  styleUrls: ['./headboard.component.scss'],
  templateUrl: './headboard.component.html',
})
export class HeadboardComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
}
