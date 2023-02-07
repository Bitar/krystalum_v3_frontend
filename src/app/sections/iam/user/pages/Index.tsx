import {useMemo} from 'react'

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
import KrysTable from '../../../../components/KrysTable';
import {Actions} from '../../../../helpers/variables';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import {useSearchParams} from 'react-router-dom';
import FormSuccess from '../../../../components/form/FormSuccess';

const UserIndex = () => {
    const [searchParams] = useSearchParams();

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.USERS_LIST} requestFunction={getUsers}>
                <ListViewProvider>
                    {
                        searchParams.has('success') ? <FormSuccess type={searchParams.get('success')} model='user' /> : <></>
                    }

                    <KTCard>
                        <KTCardHeader text='All Users' icon="fa-regular fa-list" icon_style="fs-3 text-primary" actions={[{type: Actions.CREATE, url: '/iam/users'}]}/>

                        <KTCardBody>
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
