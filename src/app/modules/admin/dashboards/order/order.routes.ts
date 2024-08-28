import { Routes } from '@angular/router';
import { OrderComponent } from './order.component';

export default [
  {
    path: '',
    component: OrderComponent,

    // resolve  : {
    //     data: () => inject(CryptoService).getData(),
    // },
  },
] as Routes;
