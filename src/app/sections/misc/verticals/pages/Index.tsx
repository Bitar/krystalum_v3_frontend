import React, {useEffect, useMemo, useState} from 'react';
import {QueryRequestProvider} from "../../../../modules/table/QueryRequestProvider";
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading
} from "../../../../modules/table/QueryResponseProvider";
import {KTCard, KTCardBody, QUERIES} from "../../../../../_metronic/helpers";
import {ListViewProvider} from "../../../../modules/table/ListViewProvider";
import {KTCardHeader} from "../../../../../_metronic/helpers/components/KTCardHeader";
import {PageTypes} from "../../../../helpers/variables";
import KrysTable from "../../../../components/tables/KrysTable";
import {VerticalsColumns} from "../core/TableColumns";
import {EXPORT_ENDPOINT, getVerticals} from "../../../../requests/misc/Vertical";
import VerticalIndexFilter from "../partials/IndexFilter";
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {Sections} from "../../../../helpers/sections";
import {CreateCardAction, ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction";

const VerticalIndex: React.FC = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_VERTICALS, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.VERTICALS_LIST} requestFunction={getVerticals}>
                <ListViewProvider>
                    <KTCard>
                        <KTCardHeader text='All Verticals' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                                          new FilterCardAction('verticals-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/misc/verticals','manage-misc')
                                      ]}/>

                        <KTCardBody>
                            <VerticalIndexFilter showFilter={showFilter} setExportQuery={setExportQuery}/>

                            <VerticalTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const VerticalTable = () => {
    const verticals = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => verticals, [verticals]);
    const columns = useMemo(() => VerticalsColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={verticals.length > 0 ? verticals[0] : null}
                   isLoading={isLoading}/>
    )
}


export default VerticalIndex;