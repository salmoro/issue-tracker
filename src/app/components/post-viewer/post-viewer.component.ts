import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/shared/data/post';

@Component({
    selector: 'viv-post-viewer',
    templateUrl: './post-viewer.component.html',
    styleUrls: ['./post-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostViewerComponent {
    @Input() post!: Post;

    @Output() private clickedEdit = new EventEmitter();

    @Output() private clickedDelete = new EventEmitter();

    public handleEditClick() {
        this.clickedEdit.emit();
    }

    public handleDeleteClick() {
        this.clickedDelete.emit();
    }
}
