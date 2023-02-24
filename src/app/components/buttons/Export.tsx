import React from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {BookType} from 'xlsx';
import {exportDataToExcel} from '../../helpers/export';
import {useKrysApp} from '../../modules/general/KrysApp';
import {GenericErrorMessage} from '../../helpers/form';

type Props = {
    url?: string,
    className?: string,
    getExportData?: () => Promise<any>,
    fileName?: string,
    fileExtension?: BookType
}

const ExportButton: React.FC<Props> = ({url, className, getExportData, fileName, fileExtension}) => {
    const krysApp = useKrysApp();

    const handleGetExportData = () => {
        getExportData?.().then(response => {
            if (axios.isAxiosError(response)) {
                krysApp.setAlert({message: GenericErrorMessage, type: 'error'})
            } else if (response === undefined) {
                krysApp.setAlert({message: GenericErrorMessage, type: 'error'})
            } else if (response.data) {
                // if we were able to get the data, then we proceed with generating the Excel sheet
                exportDataToExcel(response.data, fileName, fileExtension)
            }
        });
    };

    return (
        <Link to={''} onClick={handleGetExportData} className={clsx('btn btn-light-info fs-6', className)} title='Create'>
            <i className={clsx('fa fs-4', 'fa-download', 'pe-0')}></i>
        </Link>
    );
}

export default ExportButton;