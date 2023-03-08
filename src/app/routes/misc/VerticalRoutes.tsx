import {Route, Routes} from 'react-router-dom';
import React from 'react';

import {PageLink, PageTitle} from '../../../_metronic/layout/core';
import {SuspenseView} from '../../components/misc/SuspenseView';
import {Sections} from '../../helpers/sections';
import VerticalIndex from '../../sections/misc/verticals/pages/Index';
import VerticalCreate from '../../sections/misc/verticals/pages/Create';
import VerticalEdit from '../../sections/misc/verticals/pages/Edit';

const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.MISC_VERTICALS,
        path: '/misc/verticals/',
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

const VerticalRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{Sections.MISC_VERTICALS}</PageTitle>
                    <VerticalIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <VerticalCreate />
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <VerticalEdit />
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default VerticalRoutes;
