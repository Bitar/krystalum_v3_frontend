import {Actions} from '../../helpers/variables';
import React from 'react';
import {BookType} from 'xlsx';

type CardAction = {
    type: Actions,
    url?: string,
    target?: string,
    showFilter?: boolean,
    setShowFilter?: React.Dispatch<React.SetStateAction<boolean>>,
    getExportData?: () => Promise<any>,
    fileName?: string,
    fileExtension?: BookType
}

export default CardAction;