import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import {Sections} from '../../helpers/sections';
import AgencyIndex from '../../sections/demand/agencies/pages/Index';
import AgencyCreate from '../../sections/demand/agencies/pages/Create';
import AgencyEdit from '../../sections/demand/agencies/pages/Edit';

const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.DEMAND_AGENCIES,
        path: '/demand/agencies/',
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

const AgencyRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{Sections.DEMAND_AGENCIES}</PageTitle>
                    <AgencyIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <AgencyCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <AgencyEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default AgencyRoutes;
