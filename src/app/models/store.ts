import { Address } from './address';

export class Store {
    private _storeId: string;
    private _name: string;
    private _address: Address;
    
    constructor(name?: string, address?: Address, storeId?: string){
        this._storeId = storeId;
        this._name = name;
        this._address = address;
    }

    get storeId(): string {
        return this._storeId;
    }

    set storeId(storeId: string) {
        this._storeId = storeId;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get address(): Address {
        return this._address;
    }

    set address(address: Address) {
        this._address = address;
    }

    public isDefined(): boolean {
        return this._name != undefined && this._address.isDefined();
    }
}