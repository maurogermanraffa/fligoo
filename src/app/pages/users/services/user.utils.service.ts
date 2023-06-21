import { Injectable } from '@angular/core';
import { User } from '../interfaces/users.interfaces';


@Injectable()
export class UserUtilsService {
  constructor() { }

  private updateUsers: User[] = [];
  private deletedUsers: User[] = [];

  listUsers(apiUsers: User[]): User[] {
    if (this.updateUsers.length === 0 && this.deletedUsers.length === 0) {
      return apiUsers
    }
    apiUsers = apiUsers.map((user: User) => {
      const userUpdated = this.updateUsers.find((userUpdate: User) => user.id === userUpdate.id)
      if (userUpdated) {
        return { ...userUpdated }
      }
      return user
    }
    )
    return apiUsers.filter((user: User) => !this.deletedUsers.find((x: User) => x.id === user.id));
  }

  getUsers(user: User): User {
    const updateUser = this.updateUsers.find((userUpdate: User) => userUpdate.id === +user.id);
    return updateUser ? updateUser : user
  }

  updateUser(user: User): void {
    const userUpdated = this.updateUsers.find((userUpdate: User) => userUpdate.id === +user.id);
    if (userUpdated) {
      this.updateUsers.map((user: User) => {
        if (user.id === +userUpdated.id) {
          return { ...userUpdated }
        }
        return user
      })
    } else {
      this.updateUsers.push(user)
    }
  }

  addDeletedUser(user: User): void {
    this.deletedUsers.push(user)
  }

}

