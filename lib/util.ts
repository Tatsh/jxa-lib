export const throwErrorIfNotNil = (error?: NSError) => {
    if (!(error as NSError).isNil()) {
        throw new Error((error as NSError).localizedDescription.js);
    }
};
