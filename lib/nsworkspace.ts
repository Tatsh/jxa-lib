ObjC.import("AppKit");

export class Workspace {
  private ws: NSWorkspace;

  constructor() {
    this.ws = $.NSWorkspace.sharedWorkspace;
  }

  getInfoForFile(
    fullPath: JXString,
    appName?: JXString,
    type?: JXString
  ): boolean {
    return this.ws.getInfoForFileApplicationType(fullPath, appName, type);
  }

  isFilePackage(fullPath: string): boolean {
    return this.ws.isFilePackageAtPath(fullPath);
  }

  iconForFile(fullPath: JXString): NSImage {
    return this.ws.iconForFile(fullPath);
  }

  iconForFiles(paths: JXString[]): NSImage {
    return this.ws.iconForFiles(ObjC.wrap(paths));
  }
}
