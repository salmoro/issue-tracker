import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { EditPost } from 'src/app/shared/data/data.service';
import { Post } from 'src/app/shared/data/post';
import { animations } from './post-list-animations';

export type DeleteFn = (id: string) => Promise<any>;
export type EditFn = (post: EditPost) => Promise<any>;

@Component({
    selector: 'viv-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations,
})
export class PostListComponent {
    @Input() posts?: Post[];

    @Input() availableTags: string[] = [];

    @Input() deleteFn: DeleteFn = () => Promise.resolve();

    @Input() editFn: EditFn = () => Promise.resolve();

    public trackByFn(i: number, post: Post) {
        return post.id;
    }
}
