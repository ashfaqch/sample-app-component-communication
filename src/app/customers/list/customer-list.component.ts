import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ICustomer } from '../customer';
import { Subscription } from 'rxjs';
import { FilterTextComponent } from '../../shared/filters/filter-text.component';

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html'
})

export class CustomerListComponent implements OnInit, OnDestroy {
    @ViewChild(FilterTextComponent) filterTextComponent: FilterTextComponent;
    customers: ICustomer[] = [];
    customersFiltered: ICustomer[] = [];
    errorMessage: string;
    subscriptionGetCustomers: Subscription;
    subscriptionGetSelectedCustomer: Subscription;
    selectedCustomer: ICustomer | null;

    constructor(private customerService: CustomerService) { }

    ngOnInit() {
        this.getSelectedCustomer();
        this.getCustomers();
    }

    getCustomers(): void {
        this.subscriptionGetCustomers = this.customerService.getCustomers()
            .subscribe(
                (data: ICustomer[]) => {
                    this.customers = data;
                },
                (error: any) => this.errorMessage = <any>error,
                () => {
                    this.filterTextComponent.filterText = this.customerService.filterBy;

                    if (this.customers.length && !this.selectedCustomer) {
                        this.onSelectedCustomer(this.customers[0]);
                    }
                }
            );
    }

    getSelectedCustomer(): void {
        this.subscriptionGetSelectedCustomer = this.customerService.selectedCustomerSource$.subscribe(
            data => this.selectedCustomer = data
        );
    }

    onSelectedCustomer(customer: ICustomer): void {
        this.customerService.changeSelectedCustomer(customer);
    }

    ngOnDestroy(): void {
        this.subscriptionGetCustomers.unsubscribe();
        this.subscriptionGetSelectedCustomer.unsubscribe();
    }

    onFilterCustomer(value: string): void {
        this.customerService.filterBy = value;
        this.performFilter(value);
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.customersFiltered = this.customers.filter((customer: ICustomer) =>
                customer.name.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.customersFiltered = this.customers;
        }
    }

}
