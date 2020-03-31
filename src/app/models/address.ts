export class Address {
    private _street: string;
    private _city: string;
    private _state: string;
    private _zipCode: number;
    
    constructor(street?: string, city?: string, state?:string, zipCode?: number){
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

    get zipCode(): number {
        return this._zipCode;
    }

    set zipCode(zipCode: number) {
        this._zipCode;
    }
}