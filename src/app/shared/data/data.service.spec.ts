import { TestBed } from '@angular/core/testing';
import { AddPost, DataService } from './data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { mockPosts } from './mock-posts';
import { toPromise } from 'src/utils';
import { Post } from './post';

describe('DataService', () => {
    let service: DataService;
    let http: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
            ]
        });
        http = TestBed.inject(HttpClient);
        spyOn(http, 'get').and.returnValue(of(mockPosts));
        service = TestBed.inject(DataService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    test('adding a post should merge with mock data and propagate to getPosts()', async () => {
        const newPost: AddPost = {
            title: 'A new post',
            text: `If you're reading this, you must be bored...`,
            tags: ['needs triage'],
        };

        await service.addPost(newPost);

        const nextAvailableId = Math.max(...mockPosts.map(p => Number(p.id))) + 1;

        const expected = [
            ...mockPosts.map(p => new Post(p)),
            expect.objectContaining(({ ...newPost, id: nextAvailableId }))
        ];
        const actual = await toPromise(service.getPosts());

        expect(actual).toEqual(expected);
    });

    test('deleting a post should propagate to getPosts()', async () => {
        await service.deletePost(mockPosts[0].id);

        const [first, ...remaining] = mockPosts;

        const expected = remaining.map(p => new Post(p));

        const actual = await toPromise(service.getPosts());

        expect(actual).toEqual(expected);
    });

    test('editing a post should propagate to getPosts()', async () => {
        const editTime = new Date();
        const dateSpy = spyOn(Date, 'now').and.returnValue(editTime.getTime());

        const [first, ...rest] = await toPromise(service.getPosts());

        const editedPost = { ...first, text: 'Some new edited text' };
        await service.editPost(editedPost);

        const expected = [
            { ...editedPost, modifiedAt: editTime },
            ...rest,
        ];
        const actual = await toPromise(service.getPosts());

        expect(actual).toEqual(expected);

        // Reset Date.now()
        dateSpy.and.callThrough();
    });

    test('should return tags based on those found on existing posts', async () => {
        const expected = mockPosts.map(post => post.tags).flat();
        const actual = await toPromise(service.getUsedTags());

        expect(actual).toEqual(expected);
    });
});
