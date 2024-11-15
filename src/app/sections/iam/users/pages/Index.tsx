import React, {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {EXPORT_ENDPOINT, getUsers} from '../../../../requests/iam/User'
import {TableColumns} from '../core/TableColumns'
import {PageTypes} from '../../../../helpers/variables';
import UserIndexFilter from '../partials/IndexFilter';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {useKrysApp} from '../../../../modules/general/KrysApp';
import {Sections} from '../../../../helpers/sections';
import {CreateCardAction, ExportCardAction, FilterCardAction} from '../../../../components/misc/CardAction';
import KrysIndex from '../../../../components/tables/KrysIndex';

const UserIndex = () => {
    const krysApp = useKrysApp();

    useEffect(() => {
        krysApp.setPageTitle(generatePageTitle(Sections.IAM_USERS, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <KrysIndex queryId={QUERIES.USERS_LIST}
                   requestFunction={getUsers}
                   columnsArray={TableColumns}
                   cardHeader={
                       {
                           text: 'All Users',
                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('users-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/iam/users', 'manage-iam')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={UserIndexFilter}
        />
    )
}

export default UserIndex;
