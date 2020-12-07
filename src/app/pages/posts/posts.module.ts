import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
      PostsComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MatFormFieldModule,
    MatSelectModule,
    RouterModule.forChild([{
        path: '',
        component: PostsComponent
    }]),
  ],
  exports: [
      PostsComponent
  ]
})
export class PostsModule { }
