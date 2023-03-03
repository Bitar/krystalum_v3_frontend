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
import {exportAdvertiserIndustries, getAdvertiserIndustries} from '../../../../requests/misc/AdvertiserIndustry';
import AdvertiserIndustryIndexFilter from '../partials/IndexFilter';
import {AdvertiserIndustriesColumns} from '../core/TableColumns';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import {exportUsers} from "../../../../requests/iam/User";

const AdvertiserIndustryIndex: React.FC = () => {
    const krysApp = useKrysApp();

    const [exportQuery, setExportQuery] = useState<string>('');

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_ADVERTISER_INDUSTRIES, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.ADVERTISER_INDUSTRIES_LIST} requestFunction={getAdvertiserIndustries}>
                <ListViewProvider>
                    <KTCard>
                        <KTCardHeader text='All Advertiser Industries' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[new ExportCardAction(exportQuery, exportAdvertiserIndustries),
                                          new FilterCardAction('advertiser-industries-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/misc/advertiser-industries')]}/>

                        <KTCardBody>
                            <AdvertiserIndustryIndexFilter showFilter={showFilter} setExportQuery={setExportQuery}/>

                            <AdvertiserIndustryTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const AdvertiserIndustryTable = () => {
    const advertiserIndustries = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => advertiserIndustries, [advertiserIndustries]);
    const columns = useMemo(() => AdvertiserIndustriesColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={advertiserIndustries.length > 0 ? advertiserIndustries[0] : null}
                   isLoading={isLoading}/>
    )
}

export default AdvertiserIndustryIndex;