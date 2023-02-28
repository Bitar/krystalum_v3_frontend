import {Actions} from '../../helpers/variables';
import React from 'react';
import {ExportUrl} from '../../helpers/requests';
import {AxiosError} from 'axios';

type CardAction = {
    type: Actions,
    url?: string,
    target?: string,
    showFilter?: boolean,
    setShowFilter?: React.Dispatch<React.SetStateAction<boolean>>,
    exportQuery?: string,
    exportApiCall?: (query?: string) => Promise<ExportUrl | AxiosError | undefined>
}

export default CardAction;