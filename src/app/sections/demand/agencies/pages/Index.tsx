import React, {useEffect, useMemo, useState} from 'react'

import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider'
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading,
} from '../../../../modules/table/QueryResponseProvider'
import {EXPORT_ENDPOINT, getAgencies} from '../../../../requests/demand/Agency'
import {ListViewProvider} from '../../../../modules/table/ListViewProvider'
import {AgenciesColumns} from '../core/TableColumn'
import KrysTable from '../../../../components/tables/KrysTable';
import {PageTypes} from '../../../../helpers/variables';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import AgencyIndexFilter from '../partials/IndexFilter';
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {Sections} from "../../../../helpers/sections";
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';

const AgencyIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.DEMAND_AGENCIES, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.AGENCIES_LIST} requestFunction={getAgencies}>
                <ListViewProvider>
                    <KTCard>
                        <KTCardHeader text='All Agencies' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                                          new FilterCardAction('agencies-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/demand/agencies', 'manage-demand')
                                      ]}/>
                        <KTCardBody>
                            <AgencyIndexFilter showFilter={showFilter} setExportQuery={setExportQuery}/>

                            <AgencyTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const AgencyTable = () => {
    const agencies = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => agencies, [agencies]);
    const columns = useMemo(() => AgenciesColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={agencies.length > 0 ? agencies[0] : null} isLoading={isLoading}/>
    )
}

export default AgencyIndex;
