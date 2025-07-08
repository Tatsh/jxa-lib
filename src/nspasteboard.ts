ObjC.import('AppKit');

export type PasteboardItem = NSPasteboardItem;
export type PasteboardType = NSPasteboardType;
export const PasteboardTypeString = $.NSPasteboardTypeString;

export class GeneralPasteboard {
  private readonly general = $.NSPasteboard.generalPasteboard;

  set(data: string, type: PasteboardType = PasteboardTypeString): boolean {
    return this.general.setStringForType(data, type);
  }

  /* istanbul ignore next */
  clear() {
    this.general.clearContents;
  }

  get(index = 0): PasteboardItem {
    return ObjC.unwrap(this.general.pasteboardItems)[index];
  }
}
