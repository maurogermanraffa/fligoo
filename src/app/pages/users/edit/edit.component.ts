import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, finalize, map, mergeMap, takeUntil, tap } from 'rxjs';
import { User } from '../interfaces/users.interfaces';
import { UsersService } from '../services/users.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'fligoo-edit',
  styleUrls: ['./edit.component.scss'],
  templateUrl: './edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditComponent implements OnInit, OnDestroy {

  constructor(
    private usersService: UsersService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  user$!: Observable<User>;
  userForm!: UntypedFormGroup

  private isDestroyed$ = new Subject()

  ngOnInit(): void {
    this.initForm()
    const userId = +this.route.snapshot.params['id'];
    this.user$ = this.usersService.getUserDetail(userId);
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      personalInfo: this.fb.group({}),
    })
  }

  deleteUser(): void {
    this.usersService.deleteUser(this.userForm.value.personalInfo)
      .pipe(
        takeUntil(this.isDestroyed$),
      )
      .subscribe(() => this.goBack())
  }

  submit(): void {
    this.usersService.updateUser(this.userForm.value.personalInfo)
      .pipe(
        takeUntil(this.isDestroyed$),
        finalize(() => {
          this.goBack();
        })
      )
      .subscribe()
  }

  goBack(): void {
    this.router.navigate(['/users'])
  }

  ngOnDestroy(): void {
    this.isDestroyed$.complete()
  }
}
