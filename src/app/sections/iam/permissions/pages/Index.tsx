import {useSearchParams} from 'react-router-dom';
import {useEffect, useMemo, useState} from 'react'

import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider'
import {
    QueryResponseProvider,
    useQueryResponseData,
    useQueryResponseLoading,
} from '../../../../modules/table/QueryResponseProvider'
import {ListViewProvider} from '../../../../modules/table/ListViewProvider'
import {getPermissions} from '../../../../requests/iam/Permission';
import {PermissionsColumns} from '../core/TableColumns';
import KrysTable from '../../../../components/tables/KrysTable';
import {Actions, PageTypes} from '../../../../helpers/variables';
import FormSuccess from '../../../../components/forms/FormSuccess';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import PermissionIndexFilter from '../partials/IndexFilter';
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {Sections} from "../../../../helpers/sections";

const PermissionIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.IAM_PERMISSIONS, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [searchParams] = useSearchParams();

    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.PERMISSIONS_LIST} requestFunction={getPermissions}>
                <ListViewProvider>
                    {
                        searchParams.has('success') ? <FormSuccess type={searchParams.get('success')} model='permission' /> : <></>
                    }

                    <KTCard>
                        <KTCardHeader text='All Permissions' icon="fa-regular fa-list" icon_style="fs-3 text-primary" actions={[{
                            type: Actions.FILTER,
                            target: 'permissions-list-filter',
                            showFilter: showFilter,
                            setShowFilter: setShowFilter
                        }, {type: Actions.CREATE, url: '/iam/permissions'}]}/>

                        <KTCardBody>
                            <PermissionIndexFilter showFilter={showFilter} />

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