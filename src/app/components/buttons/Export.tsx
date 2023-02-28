import React from 'react';
import clsx from 'clsx';
import {Button} from 'react-bootstrap';
import axios, {AxiosError} from 'axios';
import {ExportUrl, extractErrors} from '../../helpers/requests';
import {GenericErrorMessage} from '../../helpers/form';
import {generateSuccessMessage} from '../../helpers/alerts';
import {Actions} from '../../helpers/variables';
import {useKrysApp} from '../../modules/general/KrysApp';

type Props = {
    exportQuery?: string,
    exportApiCall?: (query?: string) => Promise<ExportUrl | AxiosError | undefined>
    className?: string
}

const ExportButton: React.FC<Props> = ({exportQuery, exportApiCall, className}) => {
    const krysApp = useKrysApp();

    const exportHandler = () => {
        // we already have the query for our export request ready based on filters
        // we just need to do the api call
        if(exportApiCall !== undefined) {
            exportApiCall(exportQuery).then(response => {
                    if (axios.isAxiosError(response)) {
                        // we need to show the errors
                        krysApp.setAlert({message: extractErrors(response).join(' '), type: 'error'});
                    } else if (response === undefined) {
                        // show generic error message
                        krysApp.setAlert({message: GenericErrorMessage, type: 'error'});
                    } else {
                        // we need to check the status of the response
                        if(response.data.status === 'ready' && response.data.url !== undefined) {
                            krysApp.setAlert({message: generateSuccessMessage('permission', Actions.EXPORT), type: 'success'})

                            const link = document.createElement('a');
                            link.href = response.data.url;

                            link.click();
                        } else if(response.data.status === 'in_progress') {
                            // TODO mona to add message here for in progress export
                        }
                    }
                }
            );
        }
    }

    return (
        <Button className={clsx('btn btn-light-info fs-6', className)} title='Export' onClick={exportHandler}>
            <i className={clsx('fa fs-4', 'fa-arrow-down-to-line', 'pe-0')}></i>
        </Button>
    );
}

export default ExportButton;