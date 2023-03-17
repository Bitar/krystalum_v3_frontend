import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import {Sections} from '../../helpers/sections';
import HoldingGroupCreate from '../../sections/demand/holding-groups/pages/Create';
import HoldingGroupEdit from '../../sections/demand/holding-groups/pages/Edit';
import HoldingGroupIndex from '../../sections/demand/holding-groups/pages/Index';


const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.DEMAND_HOLDING_GROUPS,
        path: '/demand/holding-groups/',
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

const HoldingGroupRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{Sections.DEMAND_HOLDING_GROUPS}</PageTitle>
                    <HoldingGroupIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <HoldingGroupCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <HoldingGroupEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default HoldingGroupRoutes;
