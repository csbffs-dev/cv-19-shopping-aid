export class ReportedItem {
    public static readonly INSTOCK_TYPE = "instock";
    public static readonly OUTSTOCK_TYPE = "outstock";

    private _name: string;
    private _type: string;

    constructor(name?: string, type?: string) {
        if(type) {
            this.raiseErrorIfTypeInvalid(type);
        }
        this._name = name;
        this._type = type;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get type(): string {
        return this._type;
    }

    set type(type: string) {
        this.raiseErrorIfTypeInvalid(type);
        this._type = type;
    }

    private raiseErrorIfTypeInvalid(type: string): void {
        if(type !== ReportedItem.INSTOCK_TYPE && type !== ReportedItem.OUTSTOCK_TYPE) {
            throw Error("Invalid item type");
        }
    }
}