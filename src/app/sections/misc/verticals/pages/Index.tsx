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
import {Actions, PageTypes} from "../../../../helpers/variables";
import KrysTable from "../../../../components/tables/KrysTable";
import {VerticalsColumns} from "../core/TableColumns";
import {getVerticals} from "../../../../requests/misc/Vertical";
import VerticalIndexFilter from "../partials/IndexFilter";
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {Sections} from "../../../../helpers/sections";

const VerticalIndex: React.FC = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_TECHNOLOGIES, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.VERTICALS_LIST} requestFunction={getVerticals}>
                <ListViewProvider>
                    <KTCard>
                        <KTCardHeader text='All Verticals' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[{
                                          type: Actions.FILTER,
                                          target: 'verticals-list-filter',
                                          showFilter: showFilter,
                                          setShowFilter: setShowFilter
                                      }, {type: Actions.CREATE, url: '/misc/verticals'}]}/>

                        <KTCardBody>
                            <VerticalIndexFilter showFilter={showFilter}/>

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