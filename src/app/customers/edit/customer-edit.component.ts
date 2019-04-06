import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';
import { ICustomer } from '../customer';

@Component({
    selector: 'app-customer-edit',
    templateUrl: './customer-edit.component.html'
})

export class CustomerEditComponent implements OnInit {
    @ViewChild(NgForm) editForm: NgForm;
    pageTitle = 'Customer Edit';
    errorMessage: string;
    private originalCustomer: ICustomer;
    customer: ICustomer;

    get isDirty(): boolean {
        return this.editForm.dirty ? true : false;
    }

    constructor(private customerService: CustomerService,
        private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(
            params => {
                const id = +params['id'];
                this.getCustomer(id ? id : 0);
            }
        );
    }

    getCustomer(id: number): void {
        this.customerService.getCustomer(id)
            .subscribe(
                data => this.onCustomerRetrieved(data),
                error => this.errorMessage = <any>error
            );
    }

    onCustomerRetrieved(customer: ICustomer): void {
        // Reset back to pristine
        this.editForm.reset();

        // Display the data in the form
        // Use a copy to allow cancel.
        this.originalCustomer = customer;
        this.customer = Object.assign({}, customer);

        if (this.customer.id === 0) {
            this.pageTitle = 'Add Customer';
        } else {
            this.pageTitle = `Edit Customer: ${this.customer.name}`;
        }
    }

    onSave(): void {
        if (this.editForm.valid) {
            this.customerService.saveCustomer(this.customer)
                .subscribe(() => {
                    // Assign the changes from the copy
                    Object.keys(this.customer).forEach(key =>
                        this.originalCustomer[key] = this.customer[key]
                    );
                    this.onSaveComplete();
                },
                    (error: any) => this.errorMessage = <any>error
                );
        } else {
            this.errorMessage = 'Please correct the validation errors.';
        }
    }

    onSaveComplete(): void {
        // Reset back to pristine
        this.editForm.reset(this.editForm.value);
        // Navigate back to the customer list
        this.router.navigate(['/customers']);
    }

    onCancel(): void {
        // Navigate back to the customer list
        this.router.navigate(['/customers']);
    }

    onDelete(): void {
        if (this.customer.id) {
            if (confirm(`Really delete the customer: ${this.customer.name}?`)) {
                this.customerService.deleteCustomer(this.customer.id)
                    .subscribe(
                        () => this.onSaveComplete(),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        } else {
            this.onSaveComplete();
        }
    }

}
