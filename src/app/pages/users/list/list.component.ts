import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/pages/users/services/users.service';
import { Pagination, User } from '../interfaces/users.interfaces';
import { finalize, tap } from 'rxjs';

@Component({
  selector: 'fligoo-list',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html',
})
export class UserListComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  users: User[] = [];
  hasNextPage = true
  isLoading = false
  pageNro: number = 1


  ngOnInit(): void {
    this.populateData();
  }

  populateData(): void {
    if (this.hasNextPage && !this.isLoading) {
      this.usersService.getUsers(this.pageNro).pipe(
        tap((pagination: Pagination) => {
          this.users = [...this.users, ...pagination.data];
        }),
        tap((pagination: Pagination) => {
          this.hasNextPage = pagination.total_pages !== pagination.page;
          this.pageNro = pagination.page + 1;
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe();
    }
  }

}
