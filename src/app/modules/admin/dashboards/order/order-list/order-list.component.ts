import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AsyncPipe, CommonModule, CurrencyPipe, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { fuseAnimations } from '@fuse/animations';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { Order, OrderReadDto } from '../order.model';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router, RouterOutlet } from '@angular/router';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-order-list',
  standalone: true,
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    /* language=SCSS */
    `
            .inventory-grid {
                grid-template-columns: 48px auto 40px;

                @screen sm {
                    grid-template-columns: 48px auto 112px 72px;
                }

                @screen md {
                    grid-template-columns: 48px 112px auto 112px 72px;
                }

                @screen lg {
                    grid-template-columns: 48px 112px auto 112px 96px 96px 72px;
                }
            }
        `,
  ],
  animations: fuseAnimations,
  imports: [
    RouterOutlet,
    NgIf,
    MatProgressBarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSortModule,
    NgFor,
    NgTemplateOutlet,
    MatPaginatorModule,
    NgClass,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatRippleModule,
    AsyncPipe,
    CurrencyPipe,
  ],
})
export class OrderListComponent implements OnInit {
  isLoading: boolean = false;
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  //products$: Observable<order[]>;
  // orders$: boolean;

  orders: Order[] = [];
  orderReadDtoList: OrderReadDto[] = [];
  orderReadDto: OrderReadDto;
  order: Order;
  /**
   * constructor
   */
  constructor(private _router: Router) { }

  ngOnInit() {

    let orders: OrderReadDto[] = [{
      id: 1,
      customerId: '57b9032d-c8f4-4305-a26d-5c809f238df0',
      customerName: 'Zeeshan',
      shippingAddress: 'UAE',
      stage: 'Design',
      status: 'Pending',
      isActive: false,
      date: 'Jun 15, 2015'
    }, {
      id: 2,
      customerId: '57b9032d-c8f4-4305-a26d-5c809f238df0',
      customerName: 'Zuvaiba',
      shippingAddress: 'UAE',
      stage: 'Design',
      status: 'Pending',
      isActive: false,
      date: 'Jun 15, 2015'
    },
    {
      id: 3,
      customerId: '57b9032d-c8f4-4305-a26d-5c809f238df0',
      customerName: 'Ali',
      shippingAddress: 'UAE',
      stage: 'QA',
      status: 'Pending',
      isActive: false,
      date: 'Jun 15, 2015'
    }]

    this.orderReadDtoList = orders;
  }
  addorder() { }
  toggleEdit(id: number) {
    this._router.navigateByUrl('dashboards/orderdetails');
  }
}
