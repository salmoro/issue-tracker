import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SumPipe } from './sum.pipe';
import { LinksPipe } from './links.pipe';
import { AppDatePipe } from './app-date.pipe';


@NgModule({
  declarations: [
      SumPipe,
      LinksPipe,
      AppDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
      SumPipe,
      LinksPipe,
      AppDatePipe,
  ]
})
export class PipesModule { }
