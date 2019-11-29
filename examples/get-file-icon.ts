import { Workspace } from '../lib/nsworkspace';

/** Demonstrates calling `[NSWorkspace iconForFile:]`. */
export default function getIconOfChromeAppsDirectory() {
  const ws = new Workspace();
  const p = $.NSHomeDirectory()
    .stringByAppendingPathComponent("Applications")
    .stringByAppendingPathComponent("Chrome Apps.localized");
  const image = ws.iconForFile(p);
  const tiff = image.TIFFRepresentation;
  const r = $.NSBitmapImageRep.imageRepWithData(tiff);
  const data = r.representationUsingTypeProperties(
    $.NSPNGFileType,
    ObjC.wrap({})
  );
  data.writeToFileAtomically(
    $.NSHomeDirectory().stringByAppendingPathComponent("TheIcon.png"),
    false
  );
  return 0;
}
