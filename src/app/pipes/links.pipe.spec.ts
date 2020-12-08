import { LinksPipe } from './links.pipe';

describe('LinksPipe', () => {
    it('create an instance', () => {
        const pipe = new LinksPipe();
        expect(pipe).toBeTruthy();
    });

    test('should add target="_blank" to any html anchor tag found within string', () => {
        const text = 'This is some text with a link to my blog at <a href="https://myblog.com></a>.';
        const expected = 'This is some text with a link to my blog at <a target="_blank" href="https://myblog.com></a>.';
        const actual = (new LinksPipe()).transform(text);

        expect(actual).toBe(expected);
    });
});
