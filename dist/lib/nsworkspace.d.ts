/**
 * A workspace that can launch other apps and perform a variety of
 * file-handling services.
 */
export declare class Workspace {
    private ws;
    /** Returns the shared `NSWorkspace` instance. */
    static shared: Workspace;
    private constructor();
    /**
     * Retrieves information about the specified file.
     * @param fullPath The full path to the desired file.
     * @param appName The app the system would use to open the file.
     * @param type On input, a pointer to a string object variable;
     * on return, if the method is successful, this variable contains a string
     * object with the filename extension or encoded HFS file type of the file.
     * @returns `true` if the information was retrieved successfully;
     * otherwise, `false` if the file could not be found or the app was not
     * associated with the file.
     */
    getInfoForFile(fullPath: JXString, appName?: JXString, type?: JXString): boolean;
    /**
     * Determines whether the specified path is a file package.
     * @param fullPath The full path to examine.
     * @returns `true` if the path identifies a file package; otherwise, `false`
     * if the path does not exist, is not a directory, or is not a file package.
     */
    isFilePackage(fullPath: string): boolean;
    /**
     * Returns an image containing the icon for the specified file.
     * @param fullPath The full path to the file.
     * @returns The icon associated with the file.
     */
    iconForFile(fullPath: JXString): NSImage;
    /**
     * Returns an image containing the icon for the specified files.
     *
     * If `fullPaths` specifies one file, that file's icon is returned. If
     * `fullPaths` specifies more than one file, an icon representing the
     * multiple selection is returned.
     * @param paths An array of `JXString` objects, each of which contains the
     * full path to a file.
     * @returns The icon associated with the group of files.
     */
    iconForFiles(paths: JXString[]): NSImage;
}
