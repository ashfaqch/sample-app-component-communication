import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ICustomer } from './customer';

@Injectable()
export class CustomerService {
    private url = 'api/customers';
    private customers: ICustomer[];
    public filterBy: string;

    private selectedCustomerSource = new BehaviorSubject<ICustomer | null>(null);
    public selectedCustomerSource$ = this.selectedCustomerSource.asObservable();

    constructor(private http: HttpClient) { }

    changeSelectedCustomer(selectedCustomer: ICustomer | null): void {
        this.selectedCustomerSource.next(selectedCustomer);
    }

    getCustomers(): Observable<ICustomer[]> {
        if (this.customers) {
            return of(this.customers);
        }
        return this.http.get<ICustomer[]>(this.url)
            .pipe(
                tap(data => this.customers = data),
                catchError(this.handleError)
            );
    }

    getCustomer(id: number): Observable<ICustomer> {
        if (id === 0) {
            return of(this.initializeCustomer());
        }
        if (this.customers) {
            const foundItem = this.customers.find(item => item.id === id);
            if (foundItem) {
                return of(foundItem);
            }
        }
        const url = `${this.url}/${id}`;
        return this.http.get<ICustomer>(url)
            .pipe(
                catchError(this.handleError)
            );
    }

    private initializeCustomer(): ICustomer {
        return { 'id': 0, name: '' };
    }

    saveCustomer(customer: ICustomer): Observable<ICustomer> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        if (customer.id === 0) {
            return this.createCustomer(customer, headers);
        }
        return this.updateCustomer(customer, headers);
    }

    private createCustomer(customer: ICustomer, headers: HttpHeaders): Observable<ICustomer> {
        customer.id = null;
        return this.http.post<ICustomer>(this.url, customer, { headers: headers })
            .pipe(
                tap(data => console.log('Create Customer: ' + JSON.stringify(data))),
                tap(data => {
                    this.customers.push(data);
                    this.changeSelectedCustomer(data);
                }),
                catchError(this.handleError)
            );
    }

    private updateCustomer(customer: ICustomer, headers: HttpHeaders): Observable<ICustomer> {
        const url = `${this.url}/${customer.id}`;
        return this.http.put<ICustomer>(url, customer, { headers: headers })
            .pipe(
                tap(data => console.log('Update Customer: ' + customer.id)),
                catchError(this.handleError)
            );
    }

    deleteCustomer(id: number): Observable<ICustomer> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.url}/${id}`;
        return this.http.delete<ICustomer>(url, { headers: headers })
            .pipe(
                tap(data => console.log('Delete Customer: ' + id)),
                tap(data => {
                    const foundIndex = this.customers.findIndex(item => item.id === id);
                    if (foundIndex > -1) {
                        this.customers.splice(foundIndex, 1);
                        this.changeSelectedCustomer(null);
                    }
                }),
                catchError(this.handleError)
            );
    }

    private handleError(err) {
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // A server-side error.
            errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
    }
}
