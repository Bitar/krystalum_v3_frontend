import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import UserIndex from '../../sections/iam/users/pages/Index'
import UserCreate from '../../sections/iam/users/pages/Create';
import UserEdit from '../../sections/iam/users/pages/Edit';
import {UserShow} from '../../sections/iam/users/pages/Show';
import {Sections} from '../../helpers/sections';

const usersBreadCrumbs: Array<PageLink> = [
    {
        title: Sections.IAM_USERS,
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
                path='/:id/'
                element={
                    <>
                        <SuspenseView>
                            <PageTitle breadcrumbs={usersBreadCrumbs} showPageTitle={false}>{'Show'}</PageTitle>
                            <UserShow />
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
