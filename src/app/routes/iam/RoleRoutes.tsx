import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/SuspenseView'
import RoleIndex from '../../sections/iam/role/pages/Index';

const rolesBreadcrumbs: Array<PageLink> = [
    {
        title: 'Roles',
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
                            <PageTitle breadcrumbs={rolesBreadcrumbs} showPageTitle={false}>{'Add Role'}</PageTitle>
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
                            <PageTitle breadcrumbs={rolesBreadcrumbs}>{'View Role'}</PageTitle>
                            {/*<UserView />*/}
                        </SuspenseView>
                    </>
                }
            />
        </Routes>
    )
}

export default RoleRoutes;
