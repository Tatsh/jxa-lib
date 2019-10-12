type NSPasteboardType = JXString;
type NSPasteboardName = JXString;

interface NSPasteboardItem extends BridgedObject<IdType> {
  dataForType(type: NSPasteboardType): NSData;
  stringForType(type: NSPasteboardType): NSString;
}

interface NSPasteboard extends BridgedObject<IdType> {
  static generalPasteboard: NSPasteboard;
  static pasteboardByFilteringDataOfType(
    data: NSData,
    ofType: NSPasteboardType
  ): NSPasteboard;
  static pasteboardByFilteringFile(filename: JXString): NSPasteboard;
  static pasteboardByFilteringTypesInPasteboard(
    pasteboard: NSPasteboard
  ): NSPasteboard;
  static pasteboardWithName(name: JXString): NSPasteboard;
  static pasteboardWithUniqueName: NSPasteboard;
  releaseGlobally: void;
  clearContents: number;
  setDataForType(data: NSData, forType: NSPasteboardType): boolean;
  setStringForType(string: JXString, forType: NSPasteboardType): boolean;
  pasteboardItems: NSArray<NSPasteboardItem>;
  indexOfPasteboardItem(item: NSPasteboardItem): number;
  dataForType(type: NSPasteboardType): NSData;
  stringForType(type: NSPasteboardType): NSString;
  readonly name: NSString;
  readonly changeCount: number;
}
