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
import {TierColumns} from '../core/TableColumns';
import TierIndexFilter from '../partials/IndexFilter';
import {CreateCardAction, ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction";
import {EXPORT_ENDPOINT, getTiers} from '../../../../requests/misc/Tier';

const TierIndex: React.FC = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_TIERS, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [exportQuery, setExportQuery] = useState<string>('');

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.TIERS_LIST} requestFunction={getTiers}>
                <ListViewProvider>
                    <KTCard>
                        <KTCardHeader text='All Tiers' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                                          new FilterCardAction('tiers-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/misc/tiers', 'manage-misc')]}/>

                        <KTCardBody>
                            <TierIndexFilter showFilter={showFilter} setExportQuery={setExportQuery}/>

                            <TierTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const TierTable = () => {
    const tiers = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => tiers, [tiers]);
    const columns = useMemo(() => TierColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={tiers.length > 0 ? tiers[0] : null}
                   isLoading={isLoading}/>
    )
}

export default TierIndex;