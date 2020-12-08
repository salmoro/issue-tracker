import { Pipe } from '@angular/core';
import { SumPipe } from './sum.pipe';

describe('SumPipe', () => {
    it('create an instance', () => {
        const pipe = new SumPipe();
        expect(pipe).toBeTruthy();
    });

    test('should transform text with words of number additions/subtractions into their sums', async () => {
        const text = 'Tom is 45 years old, his sister Shirley 45+5 and their mother and father 60+2+3 and +25+41 respectively';

        const expected = 'Tom is 45 years old, his sister Shirley 50 and their mother and father 65 and 66 respectively';
        const actual = (new SumPipe()).transform(text);

        expect(actual).toBe(expected);
    });
});
