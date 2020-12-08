import { Pipe, PipeTransform } from '@angular/core';

type Acc = {
    sum: number;
    currOperator: '-' | '+';
    currNumGroup: string;
};
@Pipe({
    name: 'sum'
})
export class SumPipe implements PipeTransform {

    transform(text: string) {
        const words = text.split(/\s/);

        words.forEach(word => {
            if (this.canCalc(word)) {
                text = text.replace(word, this.calc(word).toString());
            }
        });

        return text;
    }

    private calc(text: string) {
        return text
            .split('')
            .reduce(
                (acc, val, i, arr) => {
                    let { sum, currNumGroup, currOperator } = acc;

                    if (val === '+' || val === '-') {
                        currOperator = val;
                    } else {
                        currNumGroup += val;

                        const isLastNumOfGroup
                            = (i === arr.length - 1)
                            || (arr[i + 1] === '-')
                            || (arr[i + 1] === '+');

                        if (isLastNumOfGroup) {
                            sum = this.sum(sum, Number(currNumGroup), currOperator);
                            currNumGroup = '0';
                        }
                    }

                    return { sum, currNumGroup, currOperator };
                },
                { sum: 0, currNumGroup: '0', currOperator: '+' } as Acc
            ).sum;
    }

    private sum(x: number, y: number, symbol: '+' | '-') {
        return symbol === '+'
            ? x + y
            : x - y;
    }

    private canCalc(text: string) {
        // text only contains numbers, + or -
        return /^(\d|\+|-)+$/.test(text);
    }

}
