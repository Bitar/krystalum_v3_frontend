import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider'
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading,
} from '../../../../modules/table/QueryResponseProvider'
import {ListViewProvider} from '../../../../modules/table/ListViewProvider'
import {useEffect, useMemo, useState} from 'react'
import {TableHeader} from '../../../../modules/table/TableHeader'
import {getPermission, getPermissions} from '../../../../requests/iam/Permission';
import {PermissionsColumns} from '../core/TableColumns';
import KrysTable from '../../../../components/KrysTable';
import {Alert} from 'react-bootstrap';
import {defaultPermission, Permission} from '../../../../models/iam/Permission';
import {Actions} from '../../../../helpers/variables';
import axios from 'axios';
import {useSearchParams} from 'react-router-dom';
import FormSuccess from '../../../../components/form/FormSuccess';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';

const PermissionIndex = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    console.log(searchParams.get('success'));
    console.log(searchParams.has('success'));

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.PERMISSIONS_LIST} requestFunction={getPermissions}>
                <ListViewProvider>
                    {
                        searchParams.has('success') ? <FormSuccess type={searchParams.get('success')} model='permission' /> : <></>
                    }

                    <KTCard>
                        <KTCardHeader text='All Permissions' icon="fa-regular fa-list" icon_style="fs-3 text-primary" actions={[{type: Actions.CREATE, url: '/iam/permissions'}]}/>

                        {/*<TableHeader name='Permission' url='/iam/permissions' showFilter={false} showAdd={true}/>*/}

                        <KTCardBody>
                            {/*<UserFilter />*/}
                            <PermissionTable/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const PermissionTable = () => {
    const permissions = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const data = useMemo(() => permissions, [permissions]);
    const columns = useMemo(() => PermissionsColumns, []);

    return (
        <KrysTable data={data} columns={columns} model={permissions.length > 0 ? permissions[0] : null} isLoading={isLoading} />
    )
}

export default PermissionIndex;
