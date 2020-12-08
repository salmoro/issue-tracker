import { Pipe, PipeTransform } from '@angular/core';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { isAfter, subHours, format, isToday, subMinutes } from 'date-fns';
import { formatDistanceToNow } from 'date-fns/esm';

@Pipe({
    name: 'appDate'
})
export class AppDatePipe implements PipeTransform {

    transform(date: Date) {
        return timer(0, 30_000).pipe(
            map(() => {
                const isWithinHour = isAfter(date, subHours(new Date(), 1));
                if (isWithinHour) {
                    return formatDistanceToNow(date, {addSuffix: true});
                }
                if (isToday(date)) {
                    return format(date, 'h:mm a');
                }
                return format(date, 'MMM d, yyyy');
            })
        );
    }

}
