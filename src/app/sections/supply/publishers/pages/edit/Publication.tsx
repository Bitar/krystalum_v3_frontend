import React from 'react';

import {KTCard, KTCardBody} from '../../../../../../_metronic/helpers';

import {useKrysApp} from '../../../../../modules/general/KrysApp';
import {Publisher} from '../../../../../models/supply/publisher/Publisher';

interface Props {
    publisher: Publisher | null
}

const PublisherPublication: React.FC<Props> = ({publisher}) => {
    const krysApp = useKrysApp();

    return (
        <KTCard className="card-bordered border-1">
            <KTCardBody>
                TODO
            </KTCardBody>
        </KTCard>
    );
}

export default PublisherPublication;