import { Component, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostEditorComponent } from 'src/app/components/post-editor/post-editor.component';
import { DeleteFn, EditFn } from 'src/app/components/post-list/post-list.component';
import { AddPost, DataService, EditPost } from 'src/app/shared/data/data.service';
import { Post } from 'src/app/shared/data/post';
import { Tag } from 'src/app/shared/data/post.types';
import { sleep } from 'src/utils';

@Component({
    selector: 'viv-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent {
    public selectedTags$ = new BehaviorSubject<Tag[]>([]);

    @ViewChild(PostEditorComponent) private postEditor!: PostEditorComponent;

    constructor(
        private data: DataService,
        private elementRef: ElementRef,
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

    public async handleAddPost(post: AddPost) {
        await this.data.addPost(post);

        this.postEditor.clear();

        await sleep(0);
        (this.elementRef.nativeElement as HTMLElement).scrollTop = 1_000_000;
    }

    public editPostFn: EditFn = (post: EditPost) => this.data.editPost(post);

    public deletePostFn: DeleteFn = (id: string) => this.data.deletePost(id);
}
