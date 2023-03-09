import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import {Sections} from '../../helpers/sections';
import WebsitePageIndex from '../../sections/misc/website-pages/pages/Index';
import WebsitePageCreate from '../../sections/misc/website-pages/pages/Create';
import WebsitePageEdit from '../../sections/misc/website-pages/pages/Edit';


const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.MISC_WEBSITE_PAGES,
        path: '/misc/website-pages/',
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

const WebsitePageRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{Sections.MISC_WEBSITE_PAGES}</PageTitle>
                    <WebsitePageIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <WebsitePageCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <WebsitePageEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default WebsitePageRoutes;
