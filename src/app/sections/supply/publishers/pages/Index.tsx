import React, {useEffect, useState} from 'react';
import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';
import EngageWidget from '../../../../components/widgets/EngageWidget';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {EXPORT_ENDPOINT, getPublishers} from '../../../../requests/supply/publisher/Publisher';
import {PublishersColumns} from '../core/TableColumns';
import PublisherIndexFilter from '../partials/filters/IndexFilter';

const PublisherIndex: React.FC = () => {
    const krysApp = useKrysApp();

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.SUPPLY_PUBLISHERS, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <KrysIndex queryId={QUERIES.PUBLISHERS_LIST}
                       requestFunction={getPublishers}
                       columnsArray={PublishersColumns}
                       cardHeader={
                           {
                               text: 'All Publishers',
                               icon: 'fa-regular fa-list',
                               icon_style: 'fs-3 text-primary',
                               actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                                   new FilterCardAction('publishers-list-filter', showFilter, setShowFilter),
                                   new CreateCardAction('/supply/publishers', 'manage-supply')],
                           }}
                       showFilter={showFilter}
                       setExportQuery={setExportQuery}
                       FilterComponent={PublisherIndexFilter}
            ></KrysIndex>

            {/* Archived Publishers */}
            <KTCard>
                <KTCardBody>
                    <div className="row">
                        <div className="col-12">
                            <EngageWidget
                                backgroundColor={'rgb(102, 50, 89)'}
                                backgroundPosition={'right center'}
                                backgroundImage={'/media/illustrations/sigma-1/5.png'}
                                title={'Archived Publishers'}
                                text={'Browse through the list of publishers that don\'t have publications that are currently receiving inventory'}
                                ctaText={'Go to Archived Publishers'}
                                ctaUrl={'supply/publishers/archived'}
                                ctaClasses={'btn-primary fw-semibold px-6 py-3'}
                            />
                        </div>
                    </div>
                </KTCardBody>
            </KTCard>
        </>
    )
}

export default PublisherIndex;