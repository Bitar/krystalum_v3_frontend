import {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {EXPORT_ENDPOINT, getPermissions} from '../../../../requests/iam/Permission';
import {PermissionsColumns} from '../core/TableColumns';
import PermissionIndexFilter from '../partials/IndexFilter';

const PermissionIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.IAM_PERMISSIONS, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <KrysIndex queryId={QUERIES.PERMISSIONS_LIST}
                   requestFunction={getPermissions}
                   columnsArray={PermissionsColumns}
                   cardHeader={
                       {
                           text: 'All Permissions',
                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('permissions-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/iam/permissions', 'manage-iam')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={PermissionIndexFilter}
        />
    )
}

export default PermissionIndex;
