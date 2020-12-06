import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { mockPosts } from '../src/app/shared/data/mock-posts';

writeFileSync(resolve(__dirname, '../src/assets/posts.json'), JSON.stringify(mockPosts, null, 2));
