import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import {Sections} from '../../helpers/sections';
import TechnologyCreate from '../../sections/misc/technologies/pages/Create';
import TechnologyIndex from '../../sections/misc/technologies/pages/Index';
import TechnologyEdit from '../../sections/misc/technologies/pages/Edit';

const breadcrumbs: Array<PageLink> = [
    {
        title: Sections.MISC_TECHNOLOGIES,
        path: '/iam/technologies/',
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

const TechnologyRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Technologies'}</PageTitle>
                    <TechnologyIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <TechnologyCreate />
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={breadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <TechnologyEdit />
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default TechnologyRoutes;
