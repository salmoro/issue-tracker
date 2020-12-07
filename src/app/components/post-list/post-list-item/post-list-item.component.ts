import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, NgZone, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EditPost } from 'src/app/shared/data/data.service';
import { Post } from 'src/app/shared/data/post';
import { DeleteFn, EditFn } from '../post-list.component';

@Component({
    selector: 'viv-post-list-item',
    templateUrl: './post-list-item.component.html',
    styleUrls: ['./post-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostListItemComponent {
    public viewMode$ = new BehaviorSubject<'edit' | 'view'>('view');

    @Input() public post!: Post;

    @Input() availableTags: string[] = [];

    @Input() deleteFn: DeleteFn = () => Promise.resolve();

    @Input() public editFn: EditFn = () => Promise.resolve();

    public handleEditClick() {
        this.viewMode$.next('edit');
    }

    public handleCancelEditClick() {
        this.viewMode$.next('view');
    }

    public async handleSaveEdit(post: EditPost) {
        await this.editFn(post);
        this.viewMode$.next('view');
    }

    public async handleDeleteClick() {
        await this.deleteFn(this.post.id);
    }
}
