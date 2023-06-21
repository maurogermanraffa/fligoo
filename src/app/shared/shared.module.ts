import { NgModule } from '@angular/core';
import { SharedMaterialModule } from './ext-module/material.module';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { CardComponent } from './components/card/card.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeadboardComponent } from './components/head-board/head-board.component';
import { ButtonsComponent } from './components/buttons/buttons.component';

@NgModule({
  imports: [
    SharedMaterialModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    SharedMaterialModule,
    HeadboardComponent,
    PersonalInfoComponent,
    CardComponent,
    ButtonsComponent
  ],
  declarations: [
    HeadboardComponent,
    PersonalInfoComponent,
    CardComponent,
    ButtonsComponent
  ],
  providers: [FormGroupDirective],
})
export class SharedModule { }
