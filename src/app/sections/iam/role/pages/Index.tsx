import {useMemo} from 'react'

import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider'
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading,
} from '../../../../modules/table/QueryResponseProvider'
import {ListViewProvider} from '../../../../modules/table/ListViewProvider'
import {RolesColumns} from '../core/TableColumns';
import KrysTable from '../../../../components/KrysTable';
import {getRoles} from '../../../../requests/iam/Role';
import {Actions} from '../../../../helpers/variables';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {useSearchParams} from 'react-router-dom';
import FormSuccess from '../../../../components/form/FormSuccess';

const RoleIndex = () => {
    const [searchParams] = useSearchParams();

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.ROLES_LIST} requestFunction={getRoles}>
                <ListViewProvider>
                    {
                        searchParams.has('success') ? <FormSuccess type={searchParams.get('success')} model='role' /> : <></>
                    }

                    <KTCard>
                        <KTCardHeader text='All Roles' icon="fa-regular fa-list" icon_style="fs-3 text-primary" actions={[{type: Actions.CREATE, url: '/iam/roles'}]}/>

                        <KTCardBody>
                            {/*<UserFilter />*/}
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
