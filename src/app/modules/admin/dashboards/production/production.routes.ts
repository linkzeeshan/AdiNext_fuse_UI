import { Routes } from '@angular/router';
import { ProductionComponent } from './production.component';

export default [
    {
        path: '',
        component: ProductionComponent,
        // resolve  : {
        //     data: () => inject(CryptoService).getData(),
        // },
    },
] as Routes;
