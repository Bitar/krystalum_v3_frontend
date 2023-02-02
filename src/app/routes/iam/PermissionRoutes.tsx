import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/SuspenseView'
import PermissionIndex from '../../sections/iam/permission/pages/Index';

const permissionsBreadcrumbs: Array<PageLink> = [
    {
        title: 'Permissions',
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
                    <>
                        <SuspenseView>
                            <PageTitle breadcrumbs={permissionsBreadcrumbs} showPageTitle={false}>{'Add Permission'}</PageTitle>
                            {/*<UserCreate />*/}
                        </SuspenseView>
                    </>
                }
            />
            <Route
                path='/:id/*'
                element={
                    <>
                        <SuspenseView>
                            <PageTitle breadcrumbs={permissionsBreadcrumbs}>{'View Permission'}</PageTitle>
                            {/*<UserView />*/}
                        </SuspenseView>
                    </>
                }
            />
        </Routes>
    )
}

export default PermissionRoutes;
