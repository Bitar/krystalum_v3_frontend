import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import {Sections} from '../../helpers/sections';
import AudienceIndex from '../../sections/misc/audiences/pages/Index';
import AudienceCreate from '../../sections/misc/audiences/pages/Create';
import AudienceEdit from '../../sections/misc/audiences/pages/Edit';

const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.MISC_AUDIENCES,
        path: '/misc/audiences/',
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

const AudienceRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{Sections.MISC_AUDIENCES}</PageTitle>
                    <AudienceIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <AudienceCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <AudienceEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default AudienceRoutes;
