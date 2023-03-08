import {Route, Routes} from 'react-router-dom'
import React from 'react'

import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import {Sections} from '../../helpers/sections';
import KpiIndex from '../../sections/misc/kpis/pages/Index';
import KpiCreate from '../../sections/misc/kpis/pages/Create';
import KpiEdit from '../../sections/misc/kpis/pages/Edit';

const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.MISC_KPIS,
        path: '/misc/kpis/',
        isSeparator: false,
        isActive: false,
    },
    {
        title: '',
        path: '',
        isSeparator: true,
        isActive: false,
    },
]

const KpiRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{Sections.MISC_KPIS}</PageTitle>
                    <KpiIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <KpiCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <KpiEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default KpiRoutes;
