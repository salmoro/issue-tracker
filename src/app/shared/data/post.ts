import { PostRec } from './post.types';

export class Post {
    constructor(private rec: PostRec) { }

    public id = this.rec.id;

    public title = this.rec.title;

    public text = this.rec.text;

    public tags = this.rec.tags;

    public createdAt = new Date(this.rec.created_at);

    public modifiedAt = new Date(this.rec.modified_at);
}
