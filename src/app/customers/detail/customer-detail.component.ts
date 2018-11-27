import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ICustomer } from '../customer';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-customer-detail',
    templateUrl: './customer-detail.component.html'
})

export class CustomerDetailComponent implements OnInit, OnDestroy {
    customer: ICustomer | null;
    subscriptionGetSelectedCustomer: Subscription;

    constructor(private customerService: CustomerService) { }

    ngOnInit() {
        this.getSelectedCustomer();
    }

    getSelectedCustomer(): void {
        this.subscriptionGetSelectedCustomer = this.customerService.selectedCustomerSource$.subscribe(
            data => this.customer = data
        );
    }

    ngOnDestroy(): void {
        this.subscriptionGetSelectedCustomer.unsubscribe();
    }
}
