import { Routes } from '@angular/router';
import { QAComponent } from './qa.component';

export default [
    {
        path: '',
        component: QAComponent,
        // resolve  : {
        //     data: () => inject(CryptoService).getData(),
        // },
    },
] as Routes;
