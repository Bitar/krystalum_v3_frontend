import {DateRange} from 'rsuite/DateRangePicker';

export const formatDateToMonthDayYear = (date: Date) => {
    // F d, Y => March, 7 2023
    const fullDate = new Date(date);

    return `${fullDate.toLocaleString('default', {month: 'long'})} ${fullDate.getDate()}, ${fullDate.getFullYear()}`;
}

export const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export const formatDateRange = (dateRange: DateRange) => {
    const startDate = dateRange[0];
    const endDate = dateRange[1];

    const formattedStartDate = startDate.getFullYear() + '-' + String(startDate.getMonth() + 1).padStart(2, '0') + '-' + String(startDate.getDate()).padStart(2, '0');
    const formattedEndDate = endDate.getFullYear() + '-' + (String(endDate.getMonth() + 1).padStart(2, '0')) + '-' + String(endDate.getDate()).padStart(2, '0');

    // we should use comma separator as this is the separator used in the backend to parse the date range
    return `${formattedStartDate},${formattedEndDate}`;
}