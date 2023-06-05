export const formatDateToMonthDayYear = (date: string) => {
    // F d, Y => March, 7 2023
    const fullDate = createDateFromString(date);

    return `${fullDate.toLocaleString('default', {month: 'long'})} ${fullDate.getDate()}, ${fullDate.getFullYear()}`;
}

export const createDateFromString = (date: string) => {
    // for the month we do -1 because new Date accepts month Index and not month
    return new Date(parseInt(date.split('-')[0]), parseInt(date.split('-')[1]) - 1, parseInt(date.split('-')[2]));
}