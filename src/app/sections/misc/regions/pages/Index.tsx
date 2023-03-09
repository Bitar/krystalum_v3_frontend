import React, {useEffect, useMemo, useState} from "react";
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {Sections} from "../../../../helpers/sections";
import {PageTypes} from "../../../../helpers/variables";
import {useSearchParams} from "react-router-dom";
import {QueryRequestProvider} from "../../../../modules/table/QueryRequestProvider";
import {KTCard, KTCardBody, QUERIES} from "../../../../../_metronic/helpers";
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading
} from "../../../../modules/table/QueryResponseProvider";
import {EXPORT_ENDPOINT, getRegions} from "../../../../requests/misc/Region";
import {ListViewProvider} from "../../../../modules/table/ListViewProvider";
import FormSuccess from "../../../../components/forms/FormSuccess";
import {KTCardHeader} from "../../../../../_metronic/helpers/components/KTCardHeader";
import {CreateCardAction, ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction";
import RegionIndexFilter from "../partials/IndexFilter";
import KrysTable from "../../../../components/tables/KrysTable";
import {RegionsColumns} from "../core/TableColumns";

const RegionIndex: React.FC = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_REGIONS, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [searchParams] = useSearchParams();

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.REGIONS_LIST} requestFunction={getRegions}>
                <ListViewProvider>
                    {
                        searchParams.has('success') ?
                            <FormSuccess type={searchParams.get('success')} model='region'/> : <></>
                    }
                    <KTCard>
                        <KTCardHeader text="All Regions" icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                                          new FilterCardAction('regions-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/misc/regions', 'manage-misc')]}/>

                        <KTCardBody>
                            <RegionIndexFilter showFilter={showFilter} setExportQuery={setExportQuery}/>
                            <RegionTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )



}

const RegionTable = () => {
    const regions = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => regions, [regions]);
    const columns = useMemo(() => RegionsColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={regions.length > 0 ? regions[0] : null} isLoading={isLoading}/>
    )
}
export default RegionIndex;