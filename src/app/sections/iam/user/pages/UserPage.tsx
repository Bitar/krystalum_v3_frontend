import {Navigate, Route, Routes} from 'react-router-dom'
// import {UserCreate} from '../UserCreate'
// import {PageLink, PageTitle} from '../../../../layout/core'
import React from 'react'
import {PageLink, PageTitle} from "../../../../../_metronic/layout/core";
import {SuspenseView} from "../../../../components/SuspenseView";
import UserIndex from "./UserIndex";
// import {UserView} from './UserView'
// import {SuspenseView} from '../../../../layout/SuspenseView'

const usersBreadCrumbs: Array<PageLink> = [
  {
    title: 'Users',
    path: '/iam/users/overview',
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

const UserPage: React.FC = () => {
  return (
    <Routes>
      <Route
        path='/overview'
        element={
          <>
            <SuspenseView>
              <PageTitle breadcrumbs={usersBreadCrumbs}>{'Overview'}</PageTitle>
              <UserIndex />
            </SuspenseView>
          </>
        }
      />
      <Route
        path='/create'
        element={
          <>
            <SuspenseView>
              <PageTitle breadcrumbs={usersBreadCrumbs}>{'Add User'}</PageTitle>
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
              <PageTitle breadcrumbs={usersBreadCrumbs}>{'View User'}</PageTitle>
              {/*<UserView />*/}
            </SuspenseView>
          </>
        }
      />
      <Route index element={<Navigate to='/iam/users/overview' replace={true} />} />
    </Routes>
  )
}

export default UserPage
