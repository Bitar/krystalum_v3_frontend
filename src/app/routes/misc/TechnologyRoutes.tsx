import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import {Sections} from '../../helpers/sections';
import TechnologyCreate from '../../sections/misc/technologies/pages/Create';

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
                    {/*<RoleIndex/>*/}
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
                        {/*<RoleEdit />*/}
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default TechnologyRoutes;
