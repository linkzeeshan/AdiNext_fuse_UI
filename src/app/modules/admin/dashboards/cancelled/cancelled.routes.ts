import { Routes } from '@angular/router';
import { CancelledComponent } from './cancelled.component';

export default [
    {
        path: '',
        component: CancelledComponent,
        // resolve  : {
        //     data: () => inject(CryptoService).getData(),
        // },
    },
] as Routes;
