import axios from 'axios'
import React, {useEffect} from 'react'
import {Route, Routes, useNavigate, useParams} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'

import {SuspenseView} from '../../components/misc/SuspenseView'
import {Sections} from '../../helpers/sections'
import {getPublisher} from '../../requests/supply/publisher/Publisher'
import {usePublisherEdit} from '../../sections/supply/publishers/core/PublisherEditContext'
import PublisherEdit from '../../sections/supply/publishers/pages/Edit'
import PublisherContactEdit from '../../sections/supply/publishers/pages/edit/contacts/Edit'
import PublisherPaymentEdit from '../../sections/supply/publishers/pages/edit/payments/Edit'

const PublisherEditRoutes: React.FC = () => {
  const {publisher, setPublisher} = usePublisherEdit()

  let {id} = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      // get the publisher we need to edit from the database
      getPublisher(parseInt(id)).then((response) => {
        if (axios.isAxiosError(response)) {
          // we were not able to fetch the publisher to edit, so we need to redirect
          // to error page
          navigate('/error/404')
        } else if (response === undefined) {
          // unknown error occurred
          navigate('/error/400')
        } else {
          setPublisher(response)
        }
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
    </Routes>
  )
}

export default PublisherEditRoutes
