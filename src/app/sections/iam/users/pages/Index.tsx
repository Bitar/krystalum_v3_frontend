import React, {useEffect, useMemo, useState} from 'react'

import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider'
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading,
} from '../../../../modules/table/QueryResponseProvider'
import {getUsers} from '../../../../requests/iam/User'
import {ListViewProvider} from '../../../../modules/table/ListViewProvider'
import {TableColumns} from '../core/TableColumns'
import KrysTable from '../../../../components/tables/KrysTable';
import {Actions, PageTypes} from '../../../../helpers/variables';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {useSearchParams} from 'react-router-dom';
import FormSuccess from '../../../../components/forms/FormSuccess';
import UserIndexFilter from '../partials/IndexFilter';
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {Sections} from "../../../../helpers/sections";

const UserIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.IAM_USERS, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [searchParams] = useSearchParams();

    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.USERS_LIST} requestFunction={getUsers}>
                <ListViewProvider>
                    {
                        searchParams.has('success') ?
                            <FormSuccess type={searchParams.get('success')} model='user'/> : <></>
                    }

                    <KTCard>
                        <KTCardHeader text='All Users' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[{
                                          type: Actions.FILTER,
                                          target: 'users-list-filter',
                                          showFilter: showFilter,
                                          setShowFilter: setShowFilter
                                      }, {type: Actions.CREATE, url: '/iam/users'}]}/>

                        <KTCardBody>
                            <UserIndexFilter showFilter={showFilter} />

                            <UserTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const UserTable = () => {
    const users = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => users, [users]);
    const columns = useMemo(() => TableColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={users.length > 0 ? users[0] : null} isLoading={isLoading}/>
    )
}

export default UserIndex;
