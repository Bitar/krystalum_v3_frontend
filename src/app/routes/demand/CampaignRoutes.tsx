import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import {Sections} from '../../helpers/sections';
import CampaignIndex from '../../sections/demand/campaigns/pages/Index';
import CampaignCreate from '../../sections/demand/campaigns/pages/Create';
import CampaignEdit from '../../sections/demand/campaigns/pages/Edit';


const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.DEMAND_CAMPAIGNS,
        path: '/demand/campaigns/',
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

const CampaignRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{Sections.DEMAND_CAMPAIGNS}</PageTitle>
                    <CampaignIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <CampaignCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <CampaignEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default CampaignRoutes;
