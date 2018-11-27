import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CustomerEditComponent } from './customer-edit.component';

@Injectable()
export class CustomerEditGuardService implements CanDeactivate<CustomerEditComponent> {

    canDeactivate(component: CustomerEditComponent): boolean {
        if (component.isDirty) {
            const name = component.customer.name || 'New Customer';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}
