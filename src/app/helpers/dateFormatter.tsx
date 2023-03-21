export const formatDateToMonthDayYear = (date: Date) => {
    // F d, Y => March, 7 2023
    const fullDate = new Date(date);

    return `${fullDate.toLocaleString('default', { month: 'long' })} ${fullDate.getDay()}, ${fullDate.getFullYear()}`;
}