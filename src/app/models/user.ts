export class User {
    private _firstName: string;
    private _lastName: string;
    private _zipCode: number;
    
    constructor(firstName?: string, lastName?: string, zipCode?: number){
        this._firstName = firstName;
        this._lastName = lastName;
        this._zipCode = zipCode;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(firstName: string) {
        this._firstName = firstName;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(lastName: string) {
        this._lastName = lastName;
    }

    get zipCode() {
        return this._zipCode;
    }

    set zipCode(zipCode: number) {
        this._zipCode = zipCode;
    }

    get fullName() {
        return this._firstName + ' ' + this._lastName;
    }

    isDefined(): boolean {
        return this._firstName != undefined && this._lastName != undefined && this._zipCode != undefined;
    }
 }