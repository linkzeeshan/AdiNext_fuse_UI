import { Routes } from '@angular/router';
import { DeliveredComponent } from './delivered.component';

export default [
    {
        path: '',
        component: DeliveredComponent,
        // resolve  : {
        //     data: () => inject(CryptoService).getData(),
        // },
    },
] as Routes;
