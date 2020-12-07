import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditPost } from 'src/app/shared/data/data.service';
import { Post } from 'src/app/shared/data/post';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { xor, difference } from 'lodash';
import { Tag } from 'src/app/shared/data/post.types';

@Component({
    selector: 'viv-post-editor',
    templateUrl: './post-editor.component.html',
    styleUrls: ['./post-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostEditorComponent {
    public newChipsSeparatorKeysCodes: number[] = [ENTER, COMMA];

    public post$ = new BehaviorSubject<Post | null>(null);

    public editablePost$ = new BehaviorSubject<Post | null>(null);

    public availableTags$ = new BehaviorSubject<Tag[]>([]);

    @ViewChild('tagsInput') public tagsInput!: ElementRef;

    @Input() set post(post: Post) {
        this.post$.next(post);
        this.editablePost$.next(post);
    }

    @Input() set availableTags(tags: Tag[]) {
        this.availableTags$.next(tags);
    }

    @Output() edited = new EventEmitter<EditPost>();

    @Output() canceled = new EventEmitter();

    public formIsDirty$ = combineLatest([
        this.post$,
        this.editablePost$,
    ]).pipe(
        map(([original, editable]) => JSON.stringify(original) !== JSON.stringify(editable))
    );

    public remainingAvailableTags$ = combineLatest([
        this.availableTags$,
        this.editablePost$,
    ]).pipe(map(([tags, post]) => difference(tags, post?.tags || [])));

    public handleTitleChange(title: string) {
        this.editPost({ title });
    }

    public handleTextChange(text: string) {
        this.editPost({ text });
    }

    public handleTagToggle(tag: Tag) {
        const tags = xor(this.editablePost$.value!.tags, [tag]);
        this.editPost({ tags });
    }

    public handleTagInput(value = '') {
        if (value.trim()) {
            this.handleTagToggle(value);
        }

        this.clearTagsInput();
    }

    private clearTagsInput() {
        this.tagsInput.nativeElement.value = '';
    }

    private editPost(post: Omit<EditPost, 'id'>) {
        this.editablePost$.next({
            ...this.editablePost$.value!,
            ...post
        } as Post);
    }

    public handleCancelClick() {
        this.canceled.emit();
    }

    public handleUpdateCommentClick() {
        const {
            id, tags, text, title,
        } = this.editablePost$.value!;

        this.edited.emit({
            id, tags, text, title,
        });
    }
}
