import { Routes } from '@angular/router';
import { OrderDetailComponent } from './order-detail.component';

export default [
  {
    path: '',
    component: OrderDetailComponent,

    // resolve  : {
    //     data: () => inject(CryptoService).getData(),
    // },
  },
] as Routes;
