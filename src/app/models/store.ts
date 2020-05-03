export class Store {
    public readonly ZIP_CODE_REGEX = '^[0-9]{5}(?:-[0-9]{4})?$';
    private _storeId: string;
    private _name: string;
    private _street: string;
    private _city: string;
    private _state: string;
    private _zipCode: string;
    private _latitude: number;
    private _longitude: number;
    private _address: string;

    constructor(name?: string, street?: string, city?: string, state?: string, zipCode?: string, storeId?: string) {
        this._storeId = storeId;
        this._name = name;
        this._street = street;
        this._city = city;
        this._state = state;
        this._zipCode = zipCode;
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

    get addressText(): string {
        return this._street + ' ' + this._city + ', ' + this._state + ', ' + this._zipCode;
    }

    set latitude(latitude: number) {
        this._latitude = latitude;
    }

    get latitude(): number {
        return this._latitude;
    }

    set longitude(longitude: number) {
        this._latitude = longitude;
    }

    get longitude(): number {
        return this._longitude;
    }

    get address(): string {
        return this._address;
    }

    set address(address: string) {
        this._address = address;
    }

    public isDefined(): boolean {
        return this._name !== undefined && this._address !== undefined ;
    }
}
