import {Route, Routes} from 'react-router-dom';
import React from 'react';

import {PageLink, PageTitle} from '../../../_metronic/layout/core';
import {SuspenseView} from '../../components/misc/SuspenseView';
import {Sections} from '../../helpers/sections';
import ObjectiveIndex from '../../sections/misc/objectives/pages/Index';
import ObjectiveCreate from '../../sections/misc/objectives/pages/Create';
import ObjectiveEdit from '../../sections/misc/objectives/pages/Edit';

const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.MISC_OBJECTIVES,
        path: '/misc/objectives/',
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

const ObjectiveRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{Sections.MISC_OBJECTIVES}</PageTitle>
                    <ObjectiveIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <ObjectiveCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <ObjectiveEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default ObjectiveRoutes;
