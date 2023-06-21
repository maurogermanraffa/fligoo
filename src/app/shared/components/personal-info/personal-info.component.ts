import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, } from '@angular/router';
import { Observable, map, mergeMap, tap, } from 'rxjs';
import { User } from 'src/app/pages/users/interfaces/users.interfaces';
import { UsersService } from 'src/app/pages/users/services/users.service';

@Component({
  selector: 'fligoo-personal-info',
  styleUrls: ['./personal-info.component.scss'],
  templateUrl: './personal-info.component.html',
})
export class PersonalInfoComponent implements OnInit {

  @Input() user!: User;

  form!: UntypedFormGroup

  constructor(private rootFormGroup: FormGroupDirective) { }
  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get('personalInfo') as UntypedFormGroup
    this.form.addControl(
      'id',
      new UntypedFormControl(this.user.id, Validators.required)
    )
    this.form.addControl(
      'first_name',
      new UntypedFormControl(this.user.first_name, [Validators.required, Validators.minLength(3), Validators.maxLength(20)])
    )
    this.form.addControl(
      'last_name',
      new UntypedFormControl(this.user.last_name, [Validators.required, Validators.minLength(3), Validators.maxLength(20)])
    )
    this.form.addControl(
      'email',
      new UntypedFormControl(this.user.email, [Validators.required, Validators.email])
    )
    this.form.addControl(
      'avatar',
      new UntypedFormControl(this.user.avatar, Validators.required)
    )
  }
}

