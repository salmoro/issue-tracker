import { trigger, transition, style, animate } from '@angular/animations';

export const animations = [
    trigger('contract', [
        transition(
            ':leave',
            [
                style({ height: '*', visibility: 'visible', opacity: 1 }),
                animate(300, style({ height: '0px', visibility: 'hidden', opacity: 0 })),

            ]
        )
    ])
]