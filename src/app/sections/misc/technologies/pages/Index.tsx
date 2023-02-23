import React, {useEffect, useMemo, useState} from 'react';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {Actions, PageTypes} from '../../../../helpers/variables';
import {useSearchParams} from 'react-router-dom';
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider';
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading
} from '../../../../modules/table/QueryResponseProvider';
import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers';
import {ListViewProvider} from '../../../../modules/table/ListViewProvider';
import FormSuccess from '../../../../components/forms/FormSuccess';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import KrysTable from '../../../../components/tables/KrysTable';
import {TechnologiesColumns} from '../core/TableColumns';
import {getTechnologies} from '../../../../requests/misc/Technology';
import TechnologyIndexFilter from '../partials/IndexFilter';

const TechnologyIndex: React.FC = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.MISC_TECHNOLOGIES, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [searchParams] = useSearchParams();

    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.TECHNOLOGIES_LIST} requestFunction={getTechnologies}>
                <ListViewProvider>
                    {
                        searchParams.has('success') ?
                            <FormSuccess type={searchParams.get('success')} model='technology'/> : <></>
                    }

                    <KTCard>
                        <KTCardHeader text='All Technologies' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[{
                                          type: Actions.FILTER,
                                          target: 'technologies-list-filter',
                                          showFilter: showFilter,
                                          setShowFilter: setShowFilter
                                      }, {type: Actions.CREATE, url: '/misc/technologies'}]}/>

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