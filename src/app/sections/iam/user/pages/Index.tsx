import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider'
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading,
} from '../../../../modules/table/QueryResponseProvider'
import {getUsers} from '../../../../requests/iam/UserRequest'
import {ListViewProvider} from '../../../../modules/table/ListViewProvider'
import {useMemo} from 'react'
import {TableColumns} from '../core/TableColumns'
import {TableHeader} from '../../../../modules/table/TableHeader'
import KrysTable from '../../../../components/KrysTable';

const UserIndex = () => {
    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.USERS_LIST} requestFunction={getUsers}>
                <ListViewProvider>
                    <KTCard>
                        <TableHeader name='User' url='/iam/users' showFilter={false}/>
                        <KTCardBody>
                            {/*<UserFilter />*/}
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
        <KrysTable data={data} columns={columns} model={users.length > 0 ? users[0] : null} isLoading={isLoading} />
    )
}

export default UserIndex
