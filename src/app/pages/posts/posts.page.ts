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
    templateUrl: './posts.page.html',
    styleUrls: ['./posts.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsPage {
    public selectedTags$ = new BehaviorSubject<Tag[]>([]);
    public addingNewIssueInProg$ = new BehaviorSubject(false);

    @ViewChild(PostEditorComponent) private newPostEditor!: PostEditorComponent;
    @ViewChild(PostEditorComponent, { read: ElementRef }) private newPostEditorRef!: ElementRef<HTMLElement>;

    constructor(
        private data: DataService,
    ) { }

    public availableTags$ = this.data.getAllTags();

    public usedTags$ = this.data.getUsedTags();

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
        this.addingNewIssueInProg$.next(true);

        await this.simulateProcessingDelay();
        await this.data.addPost(post);

        this.newPostEditor.clear();
        this.addingNewIssueInProg$.next(false);

        await sleep(0);
        this.scrollNewPostEditorIntoView();
    }

    public scrollNewPostEditorIntoView() {
        this.newPostEditorRef.nativeElement?.scrollIntoView();
    }

    public editPostFn: EditFn = async (post: EditPost) => {
        await this.simulateProcessingDelay();
        await this.data.editPost(post);
    }

    public deletePostFn: DeleteFn = async (id: string) => {
        await this.simulateProcessingDelay();
        await this.data.deletePost(id);
    }

    private simulateProcessingDelay() {
        return sleep(300);
    }
}
