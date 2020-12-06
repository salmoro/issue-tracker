import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataService } from './shared/data/data.service';

@Component({
    selector: 'viv-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
