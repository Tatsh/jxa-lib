import { throwErrorIfNotNil } from './util';

ObjC.import("Foundation");

export const enum FileAttributeKey {
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

export const enum FileType {
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

export class FileManager {
  private readonly fm = $.NSFileManager.defaultManager;

  attributesOfItem(path: JXString): FileAttributes {
    const error = Ref<NSError>();
    type attr = NSDictionary<
      NSString,
      { [key: string]: NSNumber | NSBoolean | NSDate | NSString }
    >;
    const ret = ObjC.deepUnwrap<attr, FileAttributes>(
      this.fm.attributesOfItemAtPathError(path, error)
    );

    throwErrorIfNotNil(error[0]);

    return ret;
  }

  contentsOfDirectory(path: JXString): string[] {
    const error = Ref<NSError>();
    const ret = ObjC.deepUnwrap(
      this.fm.contentsOfDirectoryAtPathError(path, error)
    );

    throwErrorIfNotNil(error[0]);

    return ret;
  }

  fileExists(path: JXString): boolean {
    return this.fm.fileExistsAtPath(path);
  }

  homeDirectory(): string {
    return ObjC.unwrap($.NSHomeDirectory());
  }
}
