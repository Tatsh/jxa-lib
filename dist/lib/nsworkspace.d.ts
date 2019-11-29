export declare class Workspace {
    private ws;
    constructor();
    getInfoForFile(fullPath: JXString, appName?: JXString, type?: JXString): boolean;
    isFilePackage(fullPath: string): boolean;
    iconForFile(fullPath: JXString): NSImage;
    iconForFiles(paths: JXString[]): NSImage;
}
