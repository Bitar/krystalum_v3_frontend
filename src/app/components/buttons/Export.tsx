import React from 'react';
import clsx from 'clsx';
import {Button} from 'react-bootstrap';

import axios from 'axios';
import {exportObjects, extractErrors} from '../../helpers/requests';
import {GenericErrorMessage} from '../../helpers/form';
import {AlertMessageGenerator} from '../../helpers/AlertMessageGenerator';
import {Actions, KrysToastType} from '../../helpers/variables';
import {useKrysApp} from '../../modules/general/KrysApp';

type Props = {
    exportQuery: string,
    exportEndpoint: string,
    // exportApiCall: (query?: string) => Promise<ExportUrl | AxiosError | undefined>
    className?: string
}

const ExportButton: React.FC<Props> = ({exportQuery, exportEndpoint, className}) => {
    const krysApp = useKrysApp();

    const exportHandler = () => {
        // we already have the query for our export request ready based on filters
        // we just need to do the api call
        exportObjects(exportEndpoint, exportQuery).then(
            response => {
                if (axios.isAxiosError(response)) {
                    // we need to show the errors
                    krysApp.setAlert({message: extractErrors(response).join(' '), type: KrysToastType.ERROR});
                } else if (response === undefined) {
                    // show generic error message
                    krysApp.setAlert({message: GenericErrorMessage, type: KrysToastType.ERROR});
                } else {
                    // we need to check the status of the response
                    if (response.data.status === 'ready' && response.data.url !== undefined) {
                        krysApp.setAlert({
                            message: new AlertMessageGenerator('', Actions.EXPORT, KrysToastType.SUCCESS).message,
                            type: KrysToastType.SUCCESS
                        })

                        const link = document.createElement('a');
                        link.href = response.data.url;

                        link.click();
                    } else if (response.data.status === 'pending') {
                        krysApp.setAlert({
                            message: new AlertMessageGenerator('', Actions.EXPORT, KrysToastType.PENDING).message,
                            type: KrysToastType.PENDING
                        })
                    }
                }
            }
        );
    }

    return (
        <Button className={clsx('btn btn-light-info fs-6', className)} title='Export' onClick={exportHandler}>
            <i className={clsx('fa fs-4', 'fa-arrow-down-to-line', 'pe-0')}></i>
        </Button>
    );
}

export default ExportButton;