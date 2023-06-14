import React, {useEffect} from 'react'
import {Outlet, Route, Routes, useParams} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import {submitRequest} from '../../helpers/requests'
import {Sections} from '../../helpers/sections'
import {getPublication} from '../../requests/supply/publication/Publication'
import {usePublicationEdit} from '../../sections/supply/publications/core/PublicationEditContext'
import PublicationEdit from '../../sections/supply/publications/pages/Edit'
import PublicationAdServerEdit from '../../sections/supply/publications/pages/edit/ad-servers/Edit'
import PublicationAnalyticEdit from '../../sections/supply/publications/pages/edit/analytics/Edit'
import PublicationFixedCpmEdit from '../../sections/supply/publications/pages/edit/fixed-cpms/Edit'
import PublicationFormatEdit from '../../sections/supply/publications/pages/edit/formats/Edit'
import PublicationMinimumEcpmEdit from '../../sections/supply/publications/pages/edit/minimum-ecpms/Edit'
import PublicationCampaignRestrictionEdit from '../../sections/supply/publications/pages/edit/restrictions/Edit'
import PublicationTechnologyEdit from '../../sections/supply/publications/pages/edit/technologies/Edit'
import PublicationVerticalEdit from '../../sections/supply/publications/pages/edit/verticals/Edit'
import PublicationOverview from '../../sections/supply/publications/partials/Overview'

const PublicationEditRoutes: React.FC = () => {
  const {publication, setPublication, refresh} = usePublicationEdit()

  const {id} = useParams()

  useEffect(() => {
    if (id) {
      // get the publication we need to edit from the database
      submitRequest(getPublication, [id], (response) => {
        setPublication(response)
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, refresh])

  const publicationEditBreadcrumbs: Array<PageLink> = [
    {
      title: Sections.SUPPLY_PUBLICATIONS,
      path: '/supply/publications/',
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
      title: publication?.name || '',
      path: `/supply/publications/${publication?.id}/edit`,
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
            <PublicationOverview />
            <Outlet />
          </SuspenseView>
        }
      >
        <Route
          path='/edit'
          element={
            <SuspenseView>
              <PageTitle breadcrumbs={publicationEditBreadcrumbs} showPageTitle={false}>
                {'Edit'}
              </PageTitle>
              <PublicationEdit />
            </SuspenseView>
          }
        />
        <Route
          path='/analytics/:cid/edit'
          element={
            <SuspenseView>
              <PageTitle breadcrumbs={publicationEditBreadcrumbs} showPageTitle={false}>
                {'Edit'}
              </PageTitle>
              <PublicationAnalyticEdit />
            </SuspenseView>
          }
        />
        <Route
          path='/formats/:cid/edit'
          element={
            <SuspenseView>
              <PageTitle breadcrumbs={publicationEditBreadcrumbs} showPageTitle={false}>
                {'Edit'}
              </PageTitle>
              <PublicationFormatEdit />
            </SuspenseView>
          }
        />
        <Route
          path='/verticals/:cid/edit'
          element={
            <SuspenseView>
              <PageTitle breadcrumbs={publicationEditBreadcrumbs} showPageTitle={false}>
                {'Edit'}
              </PageTitle>
              <PublicationVerticalEdit />
            </SuspenseView>
          }
        />
        <Route
          path='/ad-servers/:cid/edit'
          element={
            <SuspenseView>
              <PageTitle breadcrumbs={publicationEditBreadcrumbs} showPageTitle={false}>
                {'Edit'}
              </PageTitle>
              <PublicationAdServerEdit />
            </SuspenseView>
          }
        />
        <Route
          path='/technologies/:cid/edit'
          element={
            <SuspenseView>
              <PageTitle breadcrumbs={publicationEditBreadcrumbs} showPageTitle={false}>
                {'Edit'}
              </PageTitle>
              <PublicationTechnologyEdit />
            </SuspenseView>
          }
        />
        <Route
          path='/fixed-cpms/:cid/edit'
          element={
            <SuspenseView>
              <PageTitle breadcrumbs={publicationEditBreadcrumbs} showPageTitle={false}>
                {'Edit'}
              </PageTitle>
              <PublicationFixedCpmEdit />
            </SuspenseView>
          }
        />
        <Route
          path='/minimum-ecpms/:cid/edit'
          element={
            <SuspenseView>
              <PageTitle breadcrumbs={publicationEditBreadcrumbs} showPageTitle={false}>
                {'Edit'}
              </PageTitle>
              <PublicationMinimumEcpmEdit />
            </SuspenseView>
          }
        />
        <Route
          path='/restrictions/:cid/edit'
          element={
            <SuspenseView>
              <PageTitle breadcrumbs={publicationEditBreadcrumbs} showPageTitle={false}>
                {'Edit'}
              </PageTitle>
              <PublicationCampaignRestrictionEdit />
            </SuspenseView>
          }
        />
      </Route>
    </Routes>
  )
}

export default PublicationEditRoutes
