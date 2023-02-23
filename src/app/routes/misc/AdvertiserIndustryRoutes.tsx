import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import {Sections} from '../../helpers/sections';
import AdvertiserIndustryIndex from '../../sections/misc/advertiser_industries/pages/Index';
import AdvertiserIndustryCreate from '../../sections/misc/advertiser_industries/pages/Create';
import AdvertiserIndustryEdit from '../../sections/misc/advertiser_industries/pages/Edit';

const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.MISC_ADVERTISER_INDUSTRIES,
        path: '/misc/advertiser-industries/',
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

const AdvertiserIndustryRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{Sections.MISC_ADVERTISER_INDUSTRIES}</PageTitle>
                    <AdvertiserIndustryIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <AdvertiserIndustryCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <AdvertiserIndustryEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default AdvertiserIndustryRoutes;
