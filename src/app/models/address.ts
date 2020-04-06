import { stringify } from 'querystring';

export class Address {
    public readonly ZIP_CODE_REGEX = '^[0-9]{5}(?:-[0-9]{4})?$';
    private _street: string;
    private _city: string;
    private _state: string;
    private _zipCode: string;
    
    constructor(street?: string, city?: string, state?:string, zipCode?: string){
        this._street = street;
        this._city = city;
        this._state = state;
        this._zipCode = zipCode;
    }

    get street(): string {
        return this._street;
    }

    set street(street: string) {
        this._street = street;
    }

    get city(): string {
        return this._city;
    }

    set city(city: string) {
        this._city = city;
    }

    get state(): string {
        return this._state;
    }

    set state(state: string) {
        this._state = state;
    }

    get zipCode(): string {
        return this._zipCode;
    }

    set zipCode(zipCode: string) {
        this._zipCode = zipCode;
    }

    public isDefined(): boolean {
        return this._street != undefined &&
        this._city != undefined && this._state != undefined &&
        this.zipCode != undefined;
    }

    get addressText(): string {
        return this._street + ' ' + this._city + ', ' + this._state + ', ' + this._zipCode;
    }
}