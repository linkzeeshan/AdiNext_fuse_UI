import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Contact, Country, Tag } from 'app/modules/admin/apps/contacts/contacts.types';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContactsListComponent } from 'app/modules/admin/apps/contacts/list/list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FuseFindByKeyPipe } from '@fuse/pipes/find-by-key';
import { ContactsService } from 'app/modules/admin/apps/contacts/contacts.service';
import { MatDrawer, MatDrawerContainer, MatSidenavModule } from '@angular/material/sidenav';
import { Design, Order, OrderItem, Orders } from '../order.model';
@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [FormsModule, MatSidenavModule, NgIf, MatButtonModule, MatTooltipModule, RouterLink, MatIconModule, NgFor, FormsModule, ReactiveFormsModule,
    MatRippleModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, NgClass, MatSelectModule, MatOptionModule, MatDatepickerModule, TextFieldModule, FuseFindByKeyPipe, DatePipe],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
  providers: [ContactsListComponent]
})
export class OrderDetailComponent implements OnInit {

  @ViewChild('drawer') drawer: MatDrawer;
  drawerMode: 'over' | 'side' = 'side';

  @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
  @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
  @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;

  editMode: boolean = false;
  tags: Tag[];
  tagsEditMode: boolean = false;
  filteredTags: Tag[];
  contact: Contact;
  orderForm: UntypedFormGroup;
  contacts: Contact[];
  countries: Country[];
  private _tagsPanelOverlayRef: OverlayRef;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  drawerOpened: boolean = true;
  panels: any[] = [];
  dynamicArray: OrderItem[] = [];
  orderItem: OrderItem;
  order: Orders;
  designs: Design[] = [];
  desing: Design;
  orderItems: OrderItem[];
  /**
   *
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: UntypedFormBuilder,
    private _contactsService: ContactsService,) {
    //super();

  }
  /**
     * On init
     */
  ngOnInit(): void {
    // Open the drawer
    //this._contactsListComponent.matDrawer.open();
    // Clear the emails and phoneNumbers form arrays
    // (this.orderForm.get('orderItems') as UntypedFormArray).clear();

    this.orderItems = [{ 'id': 0, 'designId': 1, 'name': '', 'size': 0, 'quantity': 0, 'number': 0 }];
    this.desing = { 'designId': 1, 'orderId': 1, 'filename': 'design1', 'filepath': 'design1.jpg', 'isActive': true, isApproved: false, 'orderItems': this.orderItems };
    this.designs.push(this.desing);
    this.desing = { 'designId': 2, 'orderId': 1, 'filename': 'design2', 'filepath': 'design2.jpg', 'isActive': true, isApproved: false, 'orderItems': this.orderItems };
    this.designs.push(this.desing);


    this.dynamicArray.push(this.orderItem);

    //create order form
    // Create the contact form  name        : ['', [Validators.required]],
    this.orderForm = this._formBuilder.group({
      designs: this._formBuilder.array([]),
    });
    // Setup the phone numbers form array
    const orderItemFormGroups = [];
    const orderFormGroups = [];
    // Setup the emails form array
    const designFormGroups = [];

    if (this.order != undefined && this.order.orderItems.length > 0) {
      // Iterate through them
      this.order.orderItems.forEach((orderItem) => {
        // Create an email form group
        orderItemFormGroups.push(
          this._formBuilder.group({
            id: [orderItem.id],
            name: [orderItem.name],
            size: [orderItem.size],
            quantity: [orderItem.quantity],
            number: [orderItem.number]
          }),
        );
      });
    }
    else {

      //List of design Items
      orderItemFormGroups.push(
        this._formBuilder.group({
          id: 0,
          name: ['', [Validators.required]],
          size: [0.0, [Validators.required]],
          quantity: [0.0, [Validators.required]],
          number: [0.0, [Validators.required]]
        }),
      );

      //create List of design form group
      designFormGroups.push(
        this._formBuilder.group({
          designId: 1,
          orderId: 1,
          filename: 'design1',
          filepath: 'design1.jpg',
          isActive: true,
          orderItems: orderItemFormGroups,
        }
        )
      );

      designFormGroups.push(
        this._formBuilder.group(
          {
            designId: 2,
            orderId: 1,
            filename: 'design2',
            filepath: 'design2.jpg',
            isActive: true,
            orderItems: orderItemFormGroups,
          }
        )
      );

      // Create a phone number form group
      orderFormGroups.push(
        this._formBuilder.group({
          designs: designFormGroups
        })
      );
      // Add the phone numbers form groups to the phone numbers form array
      designFormGroups.forEach((designFormGroup) => {
        (this.orderForm.get('designs') as UntypedFormArray).push(designFormGroup);
      });

      var data = this.orderForm.get('designs')['controls'].forEach((design) => {
        var items = design.get('orderItems')['controls'];
      });

      //var items = data.get('orderItems')['controls']
    }
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();

    // Dispose the overlays if they are still on the DOM
    if (this._tagsPanelOverlayRef) {
      this._tagsPanelOverlayRef.dispose();
    }
  }


  /**
   * Add an empty phone number field
   */
  addPhoneNumberField(): void {

    if (!this.orderForm.valid) {
      return;
    }
    // if (this.orderForm.get('orderItems').value.length > 0) {
    //   // Get the 'orders' form array

    //   var lastIndex = this.orderForm.get('orderItems').value.length;
    //   if (this.orderForm.get('orderItems').value[lastIndex].name == '')
    //     console.log('name is required')
    //   else if (this.orderForm.get('orderItems').value[lastIndex].size == "")
    //      console.log('name is required')
    // }
    // Create an empty phone number form group
    const orderItemFormGroup = this._formBuilder.group({
      id: [''],
      avatar: [null],
      name: ['', [Validators.required]],
      size: [''],
      quantity: [Validators.required, Validators.pattern("^[0-9]*$")],
      number: [Validators.required, Validators.pattern("^[0-9]*$")],
    });

    // Get the 'orders' form array
    const ordersArray = this.orderForm.get('orderItems') as UntypedFormArray;

    // Check if the 'orders' form array exists
    if (ordersArray) {
      // Add the phone number form group to the 'orders' form array
      ordersArray.push(orderItemFormGroup);

      // Mark for check
      this._changeDetectorRef.markForCheck();
    } else {
      // If the 'orders' form array doesn't exist, log an error message
      console.error('The "orders" form array does not exist in the form.');
    }
  }
  /** Design Approved */
  designApproved(desingId: number, isApproved: boolean) {
    this.designs[desingId].isApproved = isApproved;
  }
  /**
   * Remove the phone number field
   *
   * @param index
   */
  removePhoneNumberField(index: number): void {
    // Get form array for phone numbers
    const ordersFormArray = this.orderForm.get('orderItems') as UntypedFormArray;

    // Remove the phone number field
    ordersFormArray.removeAt(index);

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  AddRow(designId: number) {
    var lastIndex = this.dynamicArray.length;
    if (lastIndex - 1 >= 0) {
      var item = this.dynamicArray[lastIndex - 1];

      this.orderItem = { 'id': lastIndex, 'designId': 1, 'name': '', 'size': 0, 'quantity': 0, 'number': 0 }
      var designIndex = this.designs[designId];
      this.designs[designId].orderItems.push(this.orderItem);
      this.dynamicArray.push(this.orderItem);

      if (item.name == '') {
        // Swal.fire({
        //   icon: "error",
        //   title: "Oops...",
        //   text: "Name is required!"
        //   // footer: '<a href="#">Why do I have this issue?</a>'
        // });
      }
      else if (item.size <= 0) {
        // Swal.fire({
        //   icon: "error",
        //   title: "Oops...",
        //   text: "Size is required!"
        //   // footer: '<a href="#">Why do I have this issue?</a>'
        // });
      }
      else if (item.quantity <= 0) {
        // Swal.fire({
        //   icon: "error",
        //   title: "Oops...",
        //   text: "Quantity is required!"
        //   // footer: '<a href="#">Why do I have this issue?</a>'
        // });
      }
      else if (item.number <= 0) {
        // Swal.fire({
        //   icon: "error",
        //   title: "Oops...",
        //   text: "Number is required!"
        //   // footer: '<a href="#">Why do I have this issue?</a>'
        // });
      }
      else {
        this.orderItem = { 'id': lastIndex, 'designId': 1, 'name': '', 'size': 0, 'quantity': 0, 'number': 0 }

        this.dynamicArray.push(this.orderItem);
      }
    }
    else {
      this.orderItem = { 'id': lastIndex, 'designId': 1, 'name': '', 'size': 0, 'quantity': 0, 'number': 0 }

      this.dynamicArray.push(this.orderItem);
    }
  }
  removeRow(index: any, desingId: number) {

    this.designs[desingId].orderItems.splice(index, 1);
    //this.dynamicArray.splice(index, 1);
  }
  AddRowData(data: OrderItem, index: any) {
    this.dynamicArray[index] = data;
    // this.dynamicArray.forEach(element => {


    // });
  }
  /**
   * Get country info by iso code
   *
   * @param iso
   */
  getCountryByIso(iso: string): Country {
    return this.countries.find(country => country.iso === iso);
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
  updateOrder() { }
}
