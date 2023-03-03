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
import {TechnologiesColumns} from '../core/TableColumns';
import {getTechnologies} from '../../../../requests/misc/Technology';
import TechnologyIndexFilter from '../partials/IndexFilter';
import {CreateCardAction, FilterCardAction} from "../../../../components/misc/CardAction";

const TechnologyIndex: React.FC = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_TECHNOLOGIES, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.TECHNOLOGIES_LIST} requestFunction={getTechnologies}>
                <ListViewProvider>
                    <KTCard>
                        <KTCardHeader text='All Technologies' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[new FilterCardAction('technologies-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/iam/technologies')
                                      ]}/>

                        <KTCardBody>
                            <TechnologyIndexFilter showFilter={showFilter}/>

                            <TechnologyTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const TechnologyTable = () => {
    const technologies = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => technologies, [technologies]);
    const columns = useMemo(() => TechnologiesColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={technologies.length > 0 ? technologies[0] : null}
                   isLoading={isLoading}/>
    )
}

export default TechnologyIndex;