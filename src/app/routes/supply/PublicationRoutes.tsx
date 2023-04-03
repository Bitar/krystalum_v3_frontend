import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import {Sections} from '../../helpers/sections';
import PublicationEditRoutes from './PublicationEditRoutes';
import PublicationIndex from '../../sections/supply/publications/pages/Index';
import PublicationCreate from '../../sections/supply/publications/pages/Create';

const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.SUPPLY_PUBLICATIONS,
        path: '/supply/publications/',
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

const PublicationRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{Sections.SUPPLY_PUBLICATIONS}</PageTitle>
                    <PublicationIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <PublicationCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/*'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <PublicationEditRoutes/>
                    </SuspenseView>
                }
            />
            <Route
                path='/archived'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Archived'}</PageTitle>
                        {/*<PublicationArchived/>*/}
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default PublicationRoutes;
