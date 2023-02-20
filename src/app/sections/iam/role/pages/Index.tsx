import React, {useMemo, useState} from 'react'
import {useSearchParams} from 'react-router-dom';

import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider'
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading,
} from '../../../../modules/table/QueryResponseProvider'
import {ListViewProvider} from '../../../../modules/table/ListViewProvider'
import {RolesColumns} from '../core/TableColumns';
import KrysTable from '../../../../components/tables/KrysTable';
import {getRoles} from '../../../../requests/iam/Role';
import {Actions} from '../../../../helpers/variables';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormSuccess from '../../../../components/forms/FormSuccess';
import RoleIndexFilter from '../partials/IndexFilter';

const RoleIndex = () => {
    const [searchParams] = useSearchParams();

    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.ROLES_LIST} requestFunction={getRoles}>
                <ListViewProvider>
                    {
                        searchParams.has('success') ? <FormSuccess type={searchParams.get('success')} model='role' /> : <></>
                    }

                    <KTCard>
                        <KTCardHeader text='All Roles' icon="fa-regular fa-list" icon_style="fs-3 text-primary" actions={[{
                            type: Actions.FILTER,
                            target: 'roles-list-filter',
                            showFilter: showFilter,
                            setShowFilter: setShowFilter
                        }, {type: Actions.CREATE, url: '/iam/roles'}]}/>

                        <KTCardBody>
                            <RoleIndexFilter showFilter={showFilter} />

                            <RoleTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const RoleTable = () => {
    const roles = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => roles, [roles]);
    const columns = useMemo(() => RolesColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={roles.length > 0 ? roles[0] : null} isLoading={isLoading} />
    )
}

export default RoleIndex;
