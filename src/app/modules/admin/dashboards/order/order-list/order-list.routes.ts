import { Routes } from '@angular/router';
import { OrderListComponent } from './order-list.component';

export default [
  {
    path: '',
    component: OrderListComponent,

    // resolve  : {
    //     data: () => inject(CryptoService).getData(),
    // },
  },
] as Routes;
