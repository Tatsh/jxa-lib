export declare const enum FileAttributeKey {
    creationDate = "NSFileCreationDate",
    extensionHidden = "NSFileExtensionHidden",
    groupOwnerAccountId = "NSFileGroupOwnerAccountId",
    groupOwnerAccountName = "NSFileGroupOwnerAccountName",
    hfsCreatorCode = "NSFileHfsCreatorCode",
    hfsTypeCode = "NSFileHFSTypeCode",
    modificationDate = "NSFileModificationDate",
    ownerAccountId = "NSFileOwnerAccountId",
    ownerAccountName = "NSFileOwnerAccountName",
    posixPermissions = "NSFilePosixPermissions",
    referenceCount = "NSFileReferenceCount",
    size = "NSFileSize",
    systemFileNumber = "NSFileSystemFileNumber",
    systemNumber = "NSFileSystemNumber",
    type = "NSFileType"
}
export declare const enum FileType {
    directory = "NSFileTypeDirectory",
    symbolicLink = "NSFileTypeSymbolicLink",
    regular = "NSFileTypeRegular"
}
export interface FileAttributes {
    NSFileOwnerAccountID: number;
    NSFileHFSTypeCode: number;
    NSFileSystemFileNumber: number;
    NSFileExtensionHidden: boolean;
    NSFileSystemNumber: number;
    NSFileSize: number;
    NSFileGroupOwnerAccountID: string;
    NSFileOwnerAccountName: string;
    NSFileCreationDate: Date;
    NSFilePosixPermissions: number;
    NSFileHFSCreatorCode: number;
    NSFileType: string;
    NSFileGroupOwnerAccountName: string;
    NSFileReferenceCount: number;
    NSFileModificationDate: Date;
    [key: string]: number | boolean | Date | string;
}
export declare class FileManager {
    private readonly fm;
    attributesOfItem(path: JXString): FileAttributes;
    contentsOfDirectory(path: JXString): string[];
    fileExists(path: JXString): boolean;
    homeDirectory(): string;
}
