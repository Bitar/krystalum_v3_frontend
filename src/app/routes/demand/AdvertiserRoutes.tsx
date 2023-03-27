import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import {Sections} from '../../helpers/sections';
import AdvertiserIndex from '../../sections/demand/advertisers/pages/Index';
import AdvertiserCreate from '../../sections/demand/advertisers/pages/Create';
import AdvertiserEditRoutes from './AdvertiserEditRoutes';

const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.DEMAND_ADVERTISERS,
        path: '/demand/advertisers/',
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

const AdvertiserRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{Sections.DEMAND_ADVERTISERS}</PageTitle>
                    <AdvertiserIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <AdvertiserCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/*'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <AdvertiserEditRoutes/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default AdvertiserRoutes;
