import React, {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {EXPORT_ENDPOINT, getRoles} from '../../../../requests/iam/Role';
import {RolesColumns} from '../core/TableColumns';
import RoleIndexFilter from '../partials/IndexFilter';

const RoleIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.IAM_ROLES, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <KrysIndex queryId={QUERIES.ROLES_LIST}
                   requestFunction={getRoles}
                   columnsArray={RolesColumns}
                   cardHeader={
                       {
                           text: 'All Roles',
                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('roles-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/iam/roles', 'manage-iam')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={RoleIndexFilter}
        />
    )
}

export default RoleIndex;
