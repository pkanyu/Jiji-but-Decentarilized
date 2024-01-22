
/**
 * Returns a data URL for an image created from the given image data.
 * @param {Uint8Array|number[]} imageData - The image data.
 * @returns {string} - The data URL for the image.
 */
export function getImageSource(imageData: Uint8Array | number[]): string {
    if (imageData != null) {
        const array = Uint8Array.from(imageData);
        const blob = new Blob([array], { type: 'image/png' });
        return URL.createObjectURL(blob);
    } else {
        return "";
    }
}