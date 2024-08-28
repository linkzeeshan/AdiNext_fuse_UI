import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Doctor } from '../../doctor/doctor.model';
import { SystemUser, User } from 'app/core/user/user.types';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatDividerModule, MatCheckboxModule, MatRadioModule, MatButtonModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss'
})
export class CreateOrderComponent {

  customers: SystemUser[] = [];
  customerProfile: SystemUser = null;
  ngOnInit() {
    let users: SystemUser[] = [{
      id: '57b9032d-c8f4-4305-a26d-5c809f238df0', firstName: 'Dr Zeeshan', lastName: 'Ayyub', email: 'linkzeeshan.ayyub@gmail.com', phoneNumber: '+923087500301', role: 'user', avatar: 'dashboard/user', status: 'Active',
      userName: ''
    },
    {
      id: '606eeb87-5629-4656-941b-fc696a96f027', firstName: 'Dr Zuvaiba', lastName: 'Ayyub', email: 'Zuvaiba@gmail.com', phoneNumber: '+923087500301', role: 'user', avatar: 'dashboard/user', status: 'Active',
      userName: ''
    }
    ];

    this.customers = users;
  }
  selectCustomerProfile(user: SystemUser) {
    this.customerProfile = user;
  }
  createOrder(user: SystemUser) {
    this.customerProfile = user;
  }
}
