import * as XLSX from 'xlsx';
import {FileFormats} from './variables';
import {formatText} from './stringGenerator';
import {BookType} from 'xlsx';

export const exportDataToExcel = (exportData: any, fileName: string|undefined, fileExtension: BookType|undefined) => {
    // set up the data we need to pass to generate the Excel sheet
    const excelData = convertToExcelData(exportData);

    // initiate the workbook
    const workbook = XLSX.utils.book_new();

    // create the sheet and fill it with the excelData
    const worksheet = XLSX.utils.aoa_to_sheet(excelData);

    // append the sheet to our created workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Exported Data');

    // write the workbook to a file buffer
    const fileBuffer = XLSX.write(workbook, { type: 'buffer', bookType: fileExtension });

    // convert the file buffer to a base64-encoded string
    const base64File = btoa(
        new Uint8Array(fileBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
        )
    );

    // create a link element with the `href` set to the data URI for the file
    const currentDate = new Date().toISOString();
    const uri = `data:${FileFormats.EXCEL_SPREADSHEET};base64,${base64File}`;
    const link = document.createElement('a');
    link.href = uri;
    link.download = (fileName !== undefined ? `${fileName}-export-${currentDate}.${fileExtension}` : `export-${currentDate}.xlsx`);

    // stimulate a click on the link element to initiate the file downloaded
    link.click();
}


export const convertToExcelData = (data: any[]) => {
    // we need to capitalize the first letter of the columns and replace the underscores with spaces
    const keys = Object.keys(data[0]);
    const headers = keys.map((key) => formatText(key));

    const rows = data.map(datum => keys.map(key => (datum[key] instanceof Object ? datum[key].map((relationDatum: any) => (relationDatum.name ? relationDatum.name : relationDatum)).join(', ') : datum[key])));

    return [headers, ...rows];
}