import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import PermissionIndex from '../../sections/iam/permissions/pages/Index';
import PermissionCreate from '../../sections/iam/permissions/pages/Create';
import PermissionEdit from '../../sections/iam/permissions/pages/Edit';
import {Sections} from '../../helpers/sections';

const permissionsBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.IAM_PERMISSIONS,
        path: '/iam/permissions/',
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

const PermissionRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Permissions'}</PageTitle>
                    <PermissionIndex/>
                </SuspenseView>
            }/>

            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={permissionsBreadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <PermissionCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={permissionsBreadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <PermissionEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default PermissionRoutes;
