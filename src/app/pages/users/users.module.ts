import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserListComponent } from './list/list.component';
import { UserEditComponent } from './edit/edit.component';
import { UsersService } from 'src/app/pages/users/services/users.service';
import { UsersRoutingModule } from './users.routing';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserUtilsService } from './services/user.utils.service';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    UserListComponent,
    UserEditComponent
  ],
  declarations: [
    UserListComponent,
    UserEditComponent
  ],
  providers: [
    UsersService,
    UserUtilsService,
    FormGroupDirective
  ],
})
export class UsersModule { }
