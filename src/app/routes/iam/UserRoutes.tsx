import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/SuspenseView'
import UserIndex from '../../sections/iam/user/pages/Index'
import UserCreate from '../../sections/iam/user/pages/Create';
import UserEdit from '../../sections/iam/user/pages/Edit';

const usersBreadCrumbs: Array<PageLink> = [
    {
        title: 'Users',
        path: '/iam/users/',
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

const UserRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Users'}</PageTitle>
                    <UserIndex/>
                </SuspenseView>
            }/>
            <Route
                path='/create'
                element={
                    <>
                        <SuspenseView>
                            <PageTitle breadcrumbs={usersBreadCrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                            <UserCreate />
                        </SuspenseView>
                    </>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <>
                        <SuspenseView>
                            <PageTitle breadcrumbs={usersBreadCrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                            <UserEdit />
                        </SuspenseView>
                    </>
                }
            />
        </Routes>
    )
}

export default UserRoutes;
