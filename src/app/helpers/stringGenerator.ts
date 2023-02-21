export const truncateText = (text: string, len: number = 50) => {
    return text.length > len ? text.substring(0, len - 3) + "..." : text;
}