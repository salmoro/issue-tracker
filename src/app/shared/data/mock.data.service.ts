import { Observable, of } from 'rxjs';
import { DataService } from './data.service';
import { Post } from './post';

export class MockDataService implements Partial<DataService> {
    public getPosts() {
        return of() as Observable<Post[]>;
    }

    public getAllTags() {
        return of([]);
    }

    public getUsedTags() {
        return of([]);
    }
}
