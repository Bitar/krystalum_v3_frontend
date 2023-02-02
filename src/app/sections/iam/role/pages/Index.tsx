import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider'
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading,
} from '../../../../modules/table/QueryResponseProvider'
import {ListViewProvider} from '../../../../modules/table/ListViewProvider'
import {useMemo} from 'react'
import {TableHeader} from '../../../../modules/table/TableHeader'
import {RolesColumns} from '../core/TableColumns';
import KrysTable from '../../../../components/KrysTable';
import {getRoles} from '../../../../requests/iam/Role';

const RoleIndex = () => {
    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.ROLES_LIST} requestFunction={getRoles}>
                <ListViewProvider>
                    <KTCard>
                        <TableHeader name='Role' url='/iam/roles' showFilter={false}/>
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
