export declare type PasteboardItem = NSPasteboardItem;
export declare type PasteboardType = NSPasteboardType;
export declare const PasteboardTypeString: JXString;
export declare class GeneralPasteboard {
    private readonly general;
    set(data: string, type?: PasteboardType): boolean;
    clear(): void;
    get(index?: number): PasteboardItem;
}
