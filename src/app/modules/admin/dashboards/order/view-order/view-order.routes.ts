import { Routes } from '@angular/router';
import { ViewOrderComponent } from './view-order.component';

export default [
  {
    path: '',
    component: ViewOrderComponent,

    // resolve  : {
    //     data: () => inject(CryptoService).getData(),
    // },
  },
] as Routes;
