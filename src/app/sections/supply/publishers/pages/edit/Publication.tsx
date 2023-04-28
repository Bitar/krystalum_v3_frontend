import React, {useState} from 'react';

import {KTCard, KTCardBody, QUERIES} from '../../../../../../_metronic/helpers';

import {KTCardHeader} from '../../../../../../_metronic/helpers/components/KTCardHeader';
import KrysInnerTable from '../../../../../components/tables/KrysInnerTable';
import {usePublisher} from '../../core/PublisherContext';
import {PublisherPublicationsColumns} from '../../core/edit/publications/TableColumns';
import {getPublisherPublications} from '../../../../../requests/supply/publisher/PublisherPublication';

const PublisherPublication: React.FC = () => {
    const {publisher} = usePublisher();
    const [refreshTable] = useState<boolean>(false);

    return (
        <KTCard className="card-bordered border-1">
            <KTCardHeader text="Associated Publications"/>

            <KTCardBody>
                {
                    publisher ?
                    <KrysInnerTable
                        doRefetch={refreshTable}
                        slug="publisher-publications"
                        queryId={QUERIES.PUBLISHER_PUBLICATIONS_LIST}
                        requestFunction={getPublisherPublications}
                        requestId={publisher.id}
                        columnsArray={PublisherPublicationsColumns}
                    ></KrysInnerTable> : <>TODO: add engage with no publications</>
                }
            </KTCardBody>
        </KTCard>
    );
}

export default PublisherPublication;