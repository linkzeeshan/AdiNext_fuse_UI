import { Routes } from '@angular/router';
import { CreateOrderComponent } from './create-order.component';

export default [
  {
    path: '',
    component: CreateOrderComponent,

    // resolve  : {
    //     data: () => inject(CryptoService).getData(),
    // },
  },
] as Routes;
