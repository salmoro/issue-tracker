import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SumPipe } from './sum.pipe';
import { LinksPipe } from './links.pipe';


@NgModule({
  declarations: [
      SumPipe,
      LinksPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
      SumPipe,
      LinksPipe
  ]
})
export class PipesModule { }
