import { Injectable } from '@angular/core';
import { assign, cloneDeep } from 'lodash-es';
import { orders as ordersData } from './data';
import { FuseMockApiService } from '@fuse/lib/mock-api';
@Injectable({
    providedIn: 'root',
})
export class orderMockApi {
    private _orders: any[] = ordersData;

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this.registerHandlers();
    }

    registerHandlers(): void {
        // -----------------------------------------------------------------------------------------------------
        // @ Categories - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/dashboard/order/orders')
            .reply(() => [200, cloneDeep(this._orders)]);
    }
}
