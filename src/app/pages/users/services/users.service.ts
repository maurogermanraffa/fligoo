import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, scheduled } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, finalize, map, mergeMap, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Pagination, User } from '../interfaces/users.interfaces';
import { ApiBridgeService } from 'src/app/core/services/api-bridge.service';
import { UserUtilsService } from './user.utils.service';


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private apiBridgeService: ApiBridgeService, private userTransformer: UserUtilsService) { }

  getUsers(pageNro: number): Observable<Pagination> {
    return this.apiBridgeService.get<any>(`?page=${pageNro}`).pipe(
      map((response: Pagination) => {
        response.data = this.userTransformer.listUsers(response.data)
        return <Pagination>response
      }),
      catchError((err: any) => {
        console.error(err);
        return of(err)
      })
    );
  }

  getUserDetail(userId: number): Observable<User> {
    return this.apiBridgeService.get<any>(`/${userId}`).pipe(
      map((response: any) => {
        response.data = this.userTransformer.getUsers(response.data)
        return <User>response.data
      }),
      catchError((err: any) => {
        console.error(err);
        return of(err)
      })
    );
  }

  updateUser(user: User): Observable<User> {
    return this.apiBridgeService.put<User>(`/${user.id}`, user).pipe(
      tap(() => {
        this.userTransformer.updateUser(user);
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
        this.userTransformer.addDeletedUser(user);
      }),
      catchError((err: any) => {
        console.error(err);
        return of(err)
      })
    );
  }


}

