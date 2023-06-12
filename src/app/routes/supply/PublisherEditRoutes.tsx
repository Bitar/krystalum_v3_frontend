import React, {useEffect} from 'react'
import {Outlet, Route, Routes, useNavigate, useParams} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'

import {SuspenseView} from '../../components/misc/SuspenseView'
import {submitRequest} from '../../helpers/requests'
import {Sections} from '../../helpers/sections'
import {getPublisher} from '../../requests/supply/publisher/Publisher'
import PublisherEdit from '../../sections/supply/publishers/pages/Edit'
import PublisherContactEdit from '../../sections/supply/publishers/pages/edit/contacts/Edit'
import PublisherPaymentEdit from '../../sections/supply/publishers/pages/edit/payments/Edit'
import {useSupply} from '../../sections/supply/shared/SupplyContext'

const PublisherEditRoutes: React.FC = () => {
  const {publisher, setPublisher} = useSupply()

  let {id} = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      // get the publisher we need to edit from the database
      submitRequest(getPublisher, [id], (response) => {
        setPublisher(response)
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const publisherEditBreadcrumbs: Array<PageLink> = [
    {
      title: Sections.SUPPLY_PUBLISHERS,
      path: '/supply/publishers/',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
    {
      title: publisher?.name || '',
      path: `/supply/publishers/${publisher?.id}/edit`,
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

  return (
    <Routes>
      <Route
        element={
          <SuspenseView>
            {/*<PublisherOverview />*/}
            <Outlet />
          </SuspenseView>
        }
      >
        <Route
          path='/edit'
          element={
            <SuspenseView>
              <PageTitle breadcrumbs={publisherEditBreadcrumbs} showPageTitle={false}>
                {'Edit'}
              </PageTitle>
              <PublisherEdit />
            </SuspenseView>
          }
        />
        <Route
          path='/contacts/:cid/edit'
          element={
            <SuspenseView>
              <PageTitle breadcrumbs={publisherEditBreadcrumbs} showPageTitle={false}>
                {'Edit'}
              </PageTitle>
              <PublisherContactEdit />
            </SuspenseView>
          }
        />
        <Route
          path='/payments/:cid/edit'
          element={
            <SuspenseView>
              <PageTitle breadcrumbs={publisherEditBreadcrumbs} showPageTitle={false}>
                {'Edit'}
              </PageTitle>
              <PublisherPaymentEdit />
            </SuspenseView>
          }
        />
      </Route>
    </Routes>
  )
}

export default PublisherEditRoutes
