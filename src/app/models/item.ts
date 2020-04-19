import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Item {
    private _name: string;
    private _tokens: string[];

    constructor(name?: string, tokens?: string[]) {
        this._name = name;
        this._tokens = tokens;
    }

    get name(): string {
        return this._name;
    }

    get tokens(): string[] {
        return this._tokens;
    }

    set name(name: string) {
        this._name = name;
    }

    set tokens(tokens: string[]) {
        this._tokens = tokens;
    }
}