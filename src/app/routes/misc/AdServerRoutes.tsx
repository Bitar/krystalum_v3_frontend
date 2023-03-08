import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import {Sections} from '../../helpers/sections';
import AdServerIndex from '../../sections/misc/ad-servers/pages/Index';
import AdServerCreate from '../../sections/misc/ad-servers/pages/Create';
import AdServerEdit from '../../sections/misc/ad-servers/pages/Edit';

const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.MISC_AD_SERVERS,
        path: '/misc/ad-servers/',
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

const AdServerRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{Sections.MISC_AD_SERVERS}</PageTitle>
                    <AdServerIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <AdServerCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <AdServerEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default AdServerRoutes;
