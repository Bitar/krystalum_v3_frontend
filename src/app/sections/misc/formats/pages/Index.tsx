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
import {FormatsColumns} from "../core/TableColumns";
import {EXPORT_ENDPOINT, getFormats} from "../../../../requests/misc/Format";
import FormatIndexFilter from "../partials/IndexFilter";
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {Sections} from "../../../../helpers/sections";
import {CreateCardAction, ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction";

const FormatIndex: React.FC = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_FORMATS, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.FORMATS_LIST} requestFunction={getFormats}>
                <ListViewProvider>
                    <KTCard>
                        <KTCardHeader text='All Formats' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                                          new FilterCardAction('formats-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/misc/formats', 'manage-misc')
                                      ]}/>

                        <KTCardBody>
                            <FormatIndexFilter showFilter={showFilter} setExportQuery={setExportQuery}/>

                            <FormatTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const FormatTable = () => {
    const formats = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => formats, [formats]);
    const columns = useMemo(() => FormatsColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={formats.length > 0 ? formats[0] : null}
                   isLoading={isLoading}/>
    )
}


export default FormatIndex;