import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'links'
})
export class LinksPipe implements PipeTransform {

    transform(text: string) {
        return text.replace(/<a/g, '<a target="_blank"');
    }

}
