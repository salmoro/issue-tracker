import { PostRec } from './post.types';

export const mockPosts: PostRec[] = [
    {
        id: '1',
        created_at: '2020-12-03T15:29:28.219Z',
        modified_at: '2020-12-03T15:29:28.219Z',
        tags: ['bug'],
        text: `Hi there.

Not certain this is a bug or a feature but your lazy-loaded pages seem to be a bit too lazy 😉.`,
        title: 'Lazy loading not working!'
    },
    {
        id: '2',
        created_at: '2020-12-04T15:29:28.219Z',
        modified_at: '2020-12-04T15:29:28.219Z',
        tags: ['question'],
        text: `Hi. I'd like to know what the guidelines are for collaborating on this project.

Specifically how architecture designs are decided.`,
        title: 'No CONTRIBUTION.md'
    },
    {
        id: '3',
        created_at: '2020-12-05T15:29:28.219Z',
        modified_at: '2020-12-05T15:29:28.219Z',
        tags: ['feature request'],
        text: `Hey guys. Love what you're doing.

I checked your lib on <a href="https://bundlephobia.com">bundlephobia.com</a> and noticed that it comes in at 300kb which is a bit heavy considering that I (and many people) only use as small subset of the functions.

Perhaps you can have them exported as individual modules?.
        `,
        title: 'Bundle size reduction'
    },
];
