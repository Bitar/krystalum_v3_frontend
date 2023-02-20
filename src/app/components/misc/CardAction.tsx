import {Actions} from '../../helpers/variables';
import React from 'react';

type CardAction = {
    type: Actions,
    url?: string,
    target?: string,
    showFilter?: boolean,
    setShowFilter?: React.Dispatch<React.SetStateAction<boolean>>
}

export default CardAction;