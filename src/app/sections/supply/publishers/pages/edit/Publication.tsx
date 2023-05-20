import React, {useState} from 'react';
import {KTCard, KTCardBody, QUERIES} from '../../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../../_metronic/helpers/components/KTCardHeader';
import KrysInnerTable from '../../../../../components/tables/KrysInnerTable';
import EngageWidget from '../../../../../components/widgets/EngageWidget';
import {getPublisherPublications} from '../../../../../requests/supply/publisher/PublisherPublication';
import {PublisherPublicationsColumns} from '../../core/edit/publications/TableColumns';
import {usePublisher} from '../../core/PublisherContext';

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
                        ></KrysInnerTable> : <></>
                }

                <EngageWidget title={'Keep track of your publications'}
                              text={'Ensure to keep track of all the publications by adding them to the platform. By doing so, you can conveniently monitor their details and access their reports.'}
                              ctaText={'Add New Publication'}
                              ctaUrl={'/supply/publications/create'}/>
            </KTCardBody>
        </KTCard>
    );
}

export default PublisherPublication;