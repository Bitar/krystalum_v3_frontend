import React from 'react'
import {Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import {Sections} from '../../helpers/sections';
import {PublisherProvider} from '../../sections/supply/publishers/core/PublisherContext';
import {PublisherEditProvider} from '../../sections/supply/publishers/core/PublisherEditContext';
import PublisherArchived from '../../sections/supply/publishers/pages/Archived';
import PublisherCreate from '../../sections/supply/publishers/pages/Create';
import PublisherIndex from '../../sections/supply/publishers/pages/Index';
import PublisherEditRoutes from './PublisherEditRoutes';

const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.SUPPLY_PUBLISHERS,
        path: '/supply/publishers/',
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

const PublisherRoutes: React.FC = () => {
    return (
        <PublisherProvider>
            <Routes>
                <Route index element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={[]}>{Sections.SUPPLY_PUBLISHERS}</PageTitle>
                        <PublisherIndex/>
                    </SuspenseView>
                }/>
                <Route
                    path="/create"
                    element={
                        <SuspenseView>
                            <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                            <PublisherCreate/>
                        </SuspenseView>
                    }
                />
                <Route
                    path="/:id/*"
                    element={
                        <PublisherEditProvider>
                            <SuspenseView>
                                <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                                <PublisherEditRoutes/>
                            </SuspenseView>
                        </PublisherEditProvider>
                    }
                />
                <Route
                    path="/archived"
                    element={
                        <SuspenseView>
                            <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Archived'}</PageTitle>
                            <PublisherArchived/>
                        </SuspenseView>
                    }
                />
            </Routes>
        </PublisherProvider>
    )
}

export default PublisherRoutes;
