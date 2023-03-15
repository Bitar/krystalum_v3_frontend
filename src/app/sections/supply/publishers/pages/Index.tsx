import React, {useEffect, useMemo, useState} from 'react';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider';
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading
} from '../../../../modules/table/QueryResponseProvider';
import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers';
import {ListViewProvider} from '../../../../modules/table/ListViewProvider';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import KrysTable from '../../../../components/tables/KrysTable';
import {EXPORT_ENDPOINT, getPublishers} from '../../../../requests/supply/Publisher';
import PublisherIndexFilter from '../partials/IndexFilter';
import {PublishersColumns} from '../core/TableColumns';
import {CreateCardAction, ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction";


const PublisherIndex: React.FC = () => {
    const krysApp = useKrysApp();

    const [exportQuery, setExportQuery] = useState<string>('');

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.SUPPLY_PUBLISHERS, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.PUBLISHERS_LIST} requestFunction={getPublishers}>
                <ListViewProvider>
                    <KTCard>
                        <KTCardHeader text='All Publishers' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                                          new FilterCardAction('publishers-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/supply/publishers', 'manage-supply')]}/>

                        <KTCardBody>
                            <PublisherIndexFilter showFilter={showFilter} setExportQuery={setExportQuery}/>

                            <PublisherTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const PublisherTable = () => {
    const publishers = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => publishers, [publishers]);
    const columns = useMemo(() => PublishersColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={publishers.length > 0 ? publishers[0] : null}
                   isLoading={isLoading}/>
    )
}

export default PublisherIndex;