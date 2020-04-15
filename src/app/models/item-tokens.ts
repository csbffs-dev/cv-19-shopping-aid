export class ItemTokens {
    private _name: string;
    private _tokens: Array<string>;

    constructor(name?: string, tokens?: Array<string>) {
        this._name = name;
        this._tokens = tokens;
    }

    get name(): string {
        return this._name;
    }

    get tokens(): Array<string> {
        return this._tokens;
    }

}