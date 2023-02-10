import {useSearchParams} from 'react-router-dom';

import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider'
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading,
} from '../../../../modules/table/QueryResponseProvider'
import {ListViewProvider} from '../../../../modules/table/ListViewProvider'
import {useMemo} from 'react'
import {getPermissions} from '../../../../requests/iam/Permission';
import {PermissionsColumns} from '../core/TableColumns';
import KrysTable from '../../../../components/tables/KrysTable';
import {Actions} from '../../../../helpers/variables';
import FormSuccess from '../../../../components/forms/FormSuccess';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';

const PermissionIndex = () => {
    const [searchParams] = useSearchParams();

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.PERMISSIONS_LIST} requestFunction={getPermissions}>
                <ListViewProvider>
                    {
                        searchParams.has('success') ? <FormSuccess type={searchParams.get('success')} model='permission' /> : <></>
                    }

                    <KTCard>
                        <KTCardHeader text='All Permissions' icon="fa-regular fa-list" icon_style="fs-3 text-primary" actions={[{type: Actions.CREATE, url: '/iam/permissions'}]}/>

                        <KTCardBody>
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
