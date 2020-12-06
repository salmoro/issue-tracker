import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

/**
 * Converts observable to Promise which resolves with its {n}th emission.
 */
export function toPromise<U>(observable: Observable<U>, emittedIndex = 1) {
    return observable.pipe(take(emittedIndex)).toPromise();
}

/**
 * Returns a promise which resolved after {duration} time
 * @param duration time in milliseconds
 */
export function sleep(duration: number) {
    return new Promise<void>(resolve => {
        setTimeout(resolve, duration);
    });
}
