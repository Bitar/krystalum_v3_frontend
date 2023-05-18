import React from 'react';

import {KTCard, KTCardBody, QUERIES} from '../../../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader';
import KrysInnerTable from '../../../../../../components/tables/KrysInnerTable';
import {getPublicationAdTechnologies} from '../../../../../../requests/supply/publication/PublicationAdTechnology';
import {PublicationAdTechnologiesColumns} from '../../../core/edit/ad-technologies/TableColumns';
import {usePublication} from '../../../core/PublicationContext';

const PublicationAdTechnologyIndex: React.FC = () => {
    const {publication} = usePublication();

    return (
        <KTCard className="card-bordered border-1">
            <KTCardHeader text="Ad Technologies"/>

            <KTCardBody>
                {
                    publication &&
                    <KrysInnerTable
                        doRefetch={false}
                        slug="publication-ad-technologies"
                        queryId={QUERIES.PUBLICATION_AD_TECHNOLOGIES_LIST}
                        requestFunction={getPublicationAdTechnologies}
                        requestId={publication.id}
                        columnsArray={PublicationAdTechnologiesColumns}
                    ></KrysInnerTable>
                }
            </KTCardBody>
        </KTCard>
    );
}

export default PublicationAdTechnologyIndex;