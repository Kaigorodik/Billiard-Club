export function toSrc(file: File) {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    })
}

export function toBase64(file: File) {
    return toSrc(file).then(truncateImageString);
}

export function truncateImageString(file: string) {
    const base64Index = file.indexOf('base64')
    return file.substr(base64Index + 7);
}
