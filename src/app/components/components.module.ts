import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list/post-list.component';
import { PostListItemComponent } from './post-list/post-list-item/post-list-item.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { TextFieldModule } from '@angular/cdk/text-field';
import { PostViewerComponent } from './post-viewer/post-viewer.component';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { PipesModule } from '../pipes/pipes.module';
import { SpinnerOverlayComponent } from './spinner-overlay/spinner-overlay.component';

@NgModule({
    declarations: [
        PostListComponent,
        PostListItemComponent,
        PostViewerComponent,
        PostEditorComponent,
        SpinnerOverlayComponent,
    ],
    imports: [
        CommonModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatChipsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        PipesModule,
        TextFieldModule,
    ],
    exports: [
        PostListComponent,
        PostEditorComponent,
        SpinnerOverlayComponent,
    ]
})
export class ComponentsModule { }
