import React, {useEffect, useMemo, useState} from 'react';
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading
} from '../../../../modules/table/QueryResponseProvider';
import KrysTable from '../../../../components/tables/KrysTable';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider';
import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers';
import {ListViewProvider} from '../../../../modules/table/ListViewProvider';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {exportBusinessUnits, getBusinessUnits} from '../../../../requests/misc/BusinessUnit';
import BusinessUnitIndexFilter from '../partials/IndexFilter';
import {BusinessUnitsColumns} from '../core/TableColumns';
import {CreateCardAction, ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction";


const BusinessUnitIndex: React.FC = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_BUSINESS_UNITS, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.BUSINESS_UNITS_LIST} requestFunction={getBusinessUnits}>
                <ListViewProvider>
                    <KTCard>
                        <KTCardHeader text='All Business Units' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[new ExportCardAction(exportQuery, exportBusinessUnits),
                                          new FilterCardAction('business-units-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/misc/business-units', 'manage-misc')]}/>

                        <KTCardBody>
                            <BusinessUnitIndexFilter showFilter={showFilter} setExportQuery={setExportQuery}/>

                            <BusinessUnitTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const BusinessUnitTable = () => {
    const businessUnits = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => businessUnits, [businessUnits]);
    const columns = useMemo(() => BusinessUnitsColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={businessUnits.length > 0 ? businessUnits[0] : null}
                   isLoading={isLoading}/>
    )
}

export default BusinessUnitIndex;