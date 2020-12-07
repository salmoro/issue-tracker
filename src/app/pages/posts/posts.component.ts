import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeleteFn, EditFn } from 'src/app/components/post-list/post-list.component';
import { DataService, EditPost } from 'src/app/shared/data/data.service';
import { Post } from 'src/app/shared/data/post';
import { Tag } from 'src/app/shared/data/post.types';

@Component({
    selector: 'viv-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent {
    public selectedTags$ = new BehaviorSubject<Tag[]>([]);

    constructor(
        private data: DataService,
    ) { }

    public availableTags$ = this.data.getTags();

    public posts$ = combineLatest([
        this.data.getPosts(),
        this.selectedTags$,
    ]).pipe(
        map(([posts, tags]) => tags.length
            ? this.filterPostsIncludingAnyTag(posts, tags)
            : posts
        )
    );

    private filterPostsIncludingAnyTag(posts: Post[], tags: Tag[]) {
        return posts
            .filter(post => tags.some(tag => post.tags.includes(tag)));
    }

    public handleTagFilterChange(tags: Tag[]) {
        this.selectedTags$.next(tags);
    }

    public editPostFn: EditFn = (post: EditPost) => this.data.editPost(post);

    public deletePostFn: DeleteFn = (id: string) => this.data.deletePost(id);
}
