import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsPage } from './posts.page';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
      PostsPage
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    RouterModule.forChild([{
        path: '',
        component: PostsPage
    }]),
  ],
  exports: [
      PostsPage
  ]
})
export class PostsModule { }
