import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { toPromise } from 'src/utils';
import { Post } from './post';
import { PostRec } from './post.types';

export type AddPost = Omit<Post, 'id' | 'modifiedAt' | 'createdAt'>;
export type EditPost = Partial<AddPost> & { id: string };

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private posts$ = new BehaviorSubject<Post[]>([]);

    constructor(
        private http: HttpClient,
    ) {
        this.loadMockData();
    }

    public getTags() {
        return this.posts$.pipe(
            map(posts => posts.map(p => p.tags).flat())
        );
    }

    public getPosts() {
        return this.posts$.asObservable();
    }

    public async editPost(data: EditPost) {
        const posts = [...(await toPromise(this.posts$))];
        const index = posts.findIndex(p => p.id === data.id)!;
        const oldVersion = posts[index];
        const newVersion = {
            ...oldVersion,
            ...data,
            modifiedAt: new Date(Date.now())
        } as Post;
        posts[index] = newVersion;
        this.posts$.next(posts);
    }

    public async addPost(post: AddPost) {
        const currentPosts = await toPromise(this.posts$);
        const now = new Date();

        const newPost = {
            ...post,
            id: await this.getNextAvailableId(),
            createdAt: now,
            modifiedAt: now,
        } as unknown as Post;

        this.posts$.next([...currentPosts, newPost]);
    }

    public async deletePost(id: string) {
        const currentPosts = await toPromise(this.posts$);
        const remaining = currentPosts.filter(p => p.id !== id);
        this.posts$.next(remaining);
    }

    private loadMockData() {
        return this.getMockPosts()
            .pipe(
                map(recs => recs.map(rec => new Post(rec)))
            ).subscribe(res => this.posts$.next(res));
    }

    private getMockPosts() {
        const path = '/assets/posts.json';
        return this.http.get<PostRec[]>(path);
    }

    private async getNextAvailableId() {
        const posts = await toPromise(this.posts$);

        return Math.max(
            ...posts.map(p => Number(p.id))
        ) + 1;
    }
}
