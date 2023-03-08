import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import {Sections} from '../../helpers/sections';
import CampaignTypeIndex from '../../sections/misc/campaign-types/pages/Index';
import CampaignTypeCreate from '../../sections/misc/campaign-types/pages/Create';
import CampaignTypeEdit from '../../sections/misc/campaign-types/pages/Edit';

const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.MISC_CAMPAIGN_TYPES,
        path: '/misc/campaign-types/',
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

const CampaignTypeRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{Sections.MISC_CAMPAIGN_TYPES}</PageTitle>
                    <CampaignTypeIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <CampaignTypeCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <CampaignTypeEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default CampaignTypeRoutes;
