function createNewFile(originalFileObj) {
    // Extract attributes
    const { lastModified, lastModifiedDate, name, size, type, webkitRelativePath } = originalFileObj;

    // Create a new Blob object with extracted attributes
    const blob = new Blob([], { type });
    blob.lastModified = lastModified;
    blob.lastModifiedDate = lastModifiedDate;
    blob.name = name;
    blob.size = size;
    blob.webkitRelativePath = webkitRelativePath;

    // Return the new Blob object
    return blob;
}
export default createNewFile;

// Usage example
