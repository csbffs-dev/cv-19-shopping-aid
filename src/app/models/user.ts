import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class User {
    private _firstName: string;
    private _lastName: string;
    private _zipCode: string;
    private _userId: string;

    constructor(firstName?: string, lastName?: string, zipCode?: string, userId?: string) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._zipCode = zipCode;
        this._userId = userId;
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

    set zipCode(zipCode: string) {
        this._zipCode = zipCode;
    }

    get fullName() {
        return this._firstName + ' ' + this._lastName;
    }

    get userId() {
        return this._userId;
    }

    set userId(userId: string) {
        this._userId = userId;
    }

    isDefined(): boolean {
        return this._firstName != undefined &&
            this._lastName != undefined &&
            this._zipCode != undefined;
    }
}