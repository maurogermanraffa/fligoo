import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, finalize, map, mergeMap, tap } from 'rxjs';
import { User } from '../interfaces/users.interfaces';
import { UsersService } from '../services/users.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'fligoo-edit',
  styleUrls: ['./edit.component.scss'],
  templateUrl: './edit.component.html',
})
export class UserEditComponent implements OnInit {

  constructor(private usersService: UsersService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  user$!: Observable<User>;
  userForm!: UntypedFormGroup

  ngOnInit(): void {
    this.populateFormData()
    this.route.paramMap
      .pipe(
        map((queryParams: any) => queryParams.params.id),
        mergeMap(
          (userId: number) =>
            (this.user$ = this.usersService.getUserDetail(userId))
        )
      )
      .subscribe()
  }

  private populateFormData(): void {
    this.userForm = this.fb.group({
      personalInfo: this.fb.group({}),
    })
  }

  delteUser(): void {
    this.usersService.deleteUser(this.userForm.value.personalInfo)
      .pipe(
        finalize(() => {
          this.router.navigate(['/users'])
        })
      )
      .subscribe()
  }

  submit(): void {
    this.usersService.updateUser(this.userForm.value.personalInfo)
      .pipe(
        finalize(() => {
          this.router.navigate(['/users'])
        })
      )
      .subscribe()
  }
}
