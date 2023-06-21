import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, scheduled } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, mergeMap, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Pagination, User } from '../interfaces/users.interfaces';
import { ApiBridgeService } from 'src/app/core/services/api-bridge.service';


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private apiBridgeService: ApiBridgeService) { }

  private listUpdateUsers: User[] = [];
  private listDelete: User[] = [];

  getUsers(pageNro: number): Observable<Pagination> {
    return this.apiBridgeService.get<any>(`?page=${pageNro}`).pipe(
      map((response: Pagination) => {
        response.data.map((user: User) => {
          this.listUpdateUsers.map((userUpdate: User) => {
            if (user.id === userUpdate.id) {
              Object.assign(user, { ...userUpdate });
            }
          })
        })
        response.data = response.data.filter((user: User) => !this.listDelete.map(x => x.id).includes(user.id));
        return <Pagination>response
      }),
      catchError((err: any) => {
        console.error(err);
        return of(err)
      })
    );
  }

  getUserDetail(userId: number): Observable<User> {
    if (this.listUpdateUsers.filter((user: User) => user.id === +userId).length > 0) {
      return of(this.listUpdateUsers.filter((user: User) => user.id === +userId)[0])
    } else {
      return this.apiBridgeService.get<any>(`/${userId}`).pipe(
        map((response: any) => {
          return <User>response.data
        }),
        catchError((err: any) => {
          console.error(err);
          return of(err)
        })
      );
    }

  }

  updateUser(user: User): Observable<User> {
    return this.apiBridgeService.put<User>(`/${user.id}`, user).pipe(
      tap(() => {
        if (this.listUpdateUsers.filter((userUpdate: User) => userUpdate.id === +user.id).length > 0) {
          this.listUpdateUsers.map((userUpdate: User) => {
            if (userUpdate.id === +user.id) {
              Object.assign(userUpdate, { ...user });
            }
          })
        } else {
          this.listUpdateUsers.push(user)
        }
      }),
      catchError((err: any) => {
        console.error(err);
        return of(err)
      })
    );
  }


  deleteUser(user: User): Observable<User> {
    return this.apiBridgeService.delete<User>(`/${user.id}`).pipe(
      tap(() => {
        this.listDelete.push(user)
      }),
      catchError((err: any) => {
        console.error(err);
        return of(err)
      })
    );
  }


}

