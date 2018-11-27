import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ICustomer } from '../customers/customer';

export class Database implements InMemoryDbService {

    createDb() {
        const customers = <ICustomer[]>[
            {
                id: 1,
                name: 'Dak Prescott'
            },
            {
                id: 2,
                name: 'Anthony Brown'
            },
            {
                id: 3,
                name: 'Ezekiel Elliott'
            },
            {
                id: 4,
                name: 'Antwaun Woods'
            }
        ];

        return { customers };
    }
}
