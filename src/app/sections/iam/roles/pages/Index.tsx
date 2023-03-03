import React, {useEffect, useMemo, useState} from 'react'
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
import {exportRoles, getRoles} from '../../../../requests/iam/Role';
import {PageTypes} from '../../../../helpers/variables';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormSuccess from '../../../../components/forms/FormSuccess';
import RoleIndexFilter from '../partials/IndexFilter';
import {useKrysApp} from "../../../../modules/general/KrysApp";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {Sections} from "../../../../helpers/sections";
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';

const RoleIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.IAM_ROLES, PageTypes.INDEX))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [searchParams] = useSearchParams();

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={QUERIES.ROLES_LIST} requestFunction={getRoles}>
                <ListViewProvider>
                    {
                        searchParams.has('success') ?
                            <FormSuccess type={searchParams.get('success')} model='role'/> : <></>
                    }

                    <KTCard>
                        <KTCardHeader text='All Roles' icon="fa-regular fa-list" icon_style="fs-3 text-primary"
                                      actions={[new ExportCardAction(exportQuery, exportRoles),
                                          new FilterCardAction('roles-list-filter', showFilter, setShowFilter),
                                          new CreateCardAction('/iam/roles', 'manage-iam')
                                      ]}/>

                        <KTCardBody>
                            <RoleIndexFilter showFilter={showFilter} setExportQuery={setExportQuery}/>

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
        <KrysTable data={data} columns={columns} model={roles.length > 0 ? roles[0] : null} isLoading={isLoading}/>
    )
}

export default RoleIndex;
