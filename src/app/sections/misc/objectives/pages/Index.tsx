import React, {useEffect, useMemo, useState} from 'react';
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading
} from '../../../../modules/table/QueryResponseProvider';
import KrysTable from '../../../../components/tables/KrysTable';
import {ObjectivesColumns} from '../core/TableColumns';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider';
import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers';
import {ListViewProvider} from '../../../../modules/table/ListViewProvider';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import ObjectiveIndexFilter from '../partials/IndexFilter';
import {getObjectives} from '../../../../requests/misc/Objective';
import {CreateCardAction, FilterCardAction} from '../../../../components/misc/CardAction';

const ObjectiveIndex: React.FC = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_OBJECTIVES, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.OBJECTIVES_LIST} requestFunction={getObjectives}>
                <ListViewProvider>
                    <KTCard>
                        <KTCardHeader text='All Objectives' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[
                                          new FilterCardAction('objectives-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/misc/objectives')]}/>

                        <KTCardBody>
                            <ObjectiveIndexFilter showFilter={showFilter}/>

                            <ObjectiveTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const ObjectiveTable = () => {
    const objectives = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => objectives, [objectives]);
    const columns = useMemo(() => ObjectivesColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={objectives.length > 0 ? objectives[0] : null}
                   isLoading={isLoading}/>
    )
}

export default ObjectiveIndex;