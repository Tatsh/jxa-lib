export const throwErrorIfNotNil = (error?: NSError) => {
    if (!(error as NSError).isNil()) {
        throw new Error((error as NSError).localizedDescription.js);
    }
};

export const chr = (x: number) => String.fromCharCode(x);
export const ord = (xs: string | string[]): number =>
    String.prototype.charCodeAt.call(xs, 0);
