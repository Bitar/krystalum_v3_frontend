export const truncateText = (text: string, len: number = 50) => {
    return text.length > len ? text.substring(0, len - 3) + '...' : text;
}

export const formatText = (text: string) => {
    return text
        .replace(/_/g, ' ')
        .replace(/^\w/, (c) => c.toUpperCase());
}

const padLeft = (nr: any, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);

export const toDateTimeString = (date: Date) => {
    return date.toDateString() + ', ' + padLeft(date.getHours()) + ':' + padLeft(date.getMinutes()) + ':' + padLeft(date.getSeconds())
}

export const formatNumberWithSuffix = (number: number): string => {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixIndex = Math.floor(Math.log10(Math.abs(number)) / 3);
    const normalizedNumber = number / Math.pow(1000, suffixIndex);

    return `${normalizedNumber.toFixed(2)}${suffixes[suffixIndex]}`;
};