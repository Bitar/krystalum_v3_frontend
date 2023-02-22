import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import RoleIndex from '../../sections/iam/roles/pages/Index';
import RoleCreate from '../../sections/iam/roles/pages/Create';
import RoleEdit from '../../sections/iam/roles/pages/Edit';
import {Sections} from '../../helpers/sections';

const rolesBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.IAM_ROLES,
        path: '/iam/roles/',
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

const RoleRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Roles'}</PageTitle>
                    <RoleIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <>
                        <SuspenseView>
                            <PageTitle breadcrumbs={rolesBreadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                            <RoleCreate />
                        </SuspenseView>
                    </>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <>
                        <SuspenseView>
                            <PageTitle breadcrumbs={rolesBreadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                            <RoleEdit />
                        </SuspenseView>
                    </>
                }
            />
        </Routes>
    )
}

export default RoleRoutes;
