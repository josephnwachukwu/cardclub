import { Address } from './address.model';
export class Order {

    name?:string;
    cardType?:string;
    cardTemplate?:string;
    address?:any;

    constructor() {
        this.address = Object.assign ({}, new Address())
    }
}