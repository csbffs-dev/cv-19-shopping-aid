export class SearchedItem {
    private _daysAgo: number;
    private _hoursAgo: number;
    private _storeName: string;
    private _storeAddress: string;
    // omit store latitude and longitude
    private _inStock: boolean;
    private _seenCount: number;

    constructor(daysAgo?: number, hoursAgo?: number, storeName?: string, storeAddress?: string, inStock?: boolean, seenCount?: number) {
        this._daysAgo = daysAgo;
        this._hoursAgo = hoursAgo;
        this._storeName = storeName
        this._storeAddress = storeAddress;
        this._inStock = inStock;
        this._seenCount = seenCount;
    }

    get daysAgo(): number {
        return this._daysAgo;
    }

    get hoursAgo(): number {
        return this._hoursAgo;
    }

    get storeName(): string {
        return this._storeName;
    }

    get storeAddress(): string {
        return this._storeAddress;
    }

    get inStock(): boolean {
        return this._inStock;
    }

    get seenCnt(): number {
        return this._seenCount;
    }
}