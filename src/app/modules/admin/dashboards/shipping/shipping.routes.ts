import { Routes } from '@angular/router';
import { ShippingComponent } from './shipping.component';

export default [
    {
        path: '',
        component: ShippingComponent,
        // resolve  : {
        //     data: () => inject(CryptoService).getData(),
        // },
    },
] as Routes;
