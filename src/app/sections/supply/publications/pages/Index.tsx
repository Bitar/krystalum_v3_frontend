import React, {useEffect, useState} from 'react'
import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers'
import {
  CreateCardAction,
  ExportCardAction,
  FilterCardAction,
} from '../../../../components/misc/CardAction'
import KrysIndex from '../../../../components/tables/KrysIndex'
import EngageWidget from '../../../../components/widgets/EngageWidget'
import {RoleEnum} from '../../../../enums/RoleEnum'
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator'
import {Sections} from '../../../../helpers/sections'
import {PageTypes} from '../../../../helpers/variables'
import {useAuth} from '../../../../modules/auth'
import {useKrysApp} from '../../../../modules/general/KrysApp'
import {EXPORT_ENDPOINT, getPublications} from '../../../../requests/supply/publication/Publication'
import {PublicationsColumns} from '../core/TableColumns'
import PublicationIndexFilter from '../partials/filters/IndexFilter'

const PublicationIndex: React.FC = () => {
  const {currentUser, hasRoles} = useAuth()
  const krysApp = useKrysApp()

  const [exportQuery, setExportQuery] = useState<string>('')
  const [showFilter, setShowFilter] = useState<boolean>(false)

  useEffect(() => {
    krysApp.setPageTitle(generatePageTitle(Sections.SUPPLY_PUBLICATIONS, PageTypes.INDEX))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <KrysIndex
        queryId={QUERIES.PUBLICATIONS_LIST}
        requestFunction={getPublications}
        columnsArray={PublicationsColumns}
        cardHeader={{
          text: 'All Publications',
          actions: [
            new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
            new FilterCardAction('publications-list-filter', showFilter, setShowFilter),
            new CreateCardAction('/supply/publications', 'manage-supply'),
          ],
        }}
        showFilter={showFilter}
        setExportQuery={setExportQuery}
        FilterComponent={PublicationIndexFilter}
      ></KrysIndex>

      {!hasRoles(currentUser, [RoleEnum.PUBLISHER]) && (
        <>
          {/* Archived Publications */}
          <KTCard className='mt-8'>
            <KTCardBody>
              <div className='row'>
                <div className='col-12'>
                  <EngageWidget
                    backgroundColor={'rgb(102, 50, 89)'}
                    backgroundPosition={'right center'}
                    backgroundImage={'/media/illustrations/sigma-1/5.png'}
                    title={'Archived Publications'}
                    text={
                      'Browse through the list of publications that currently are not receiving inventory'
                    }
                    ctaText={'Go to Archived Publications'}
                    ctaUrl={'/supply/publications/archived'}
                    ctaClasses={'btn-primary fw-semibold px-6 py-3'}
                  />
                </div>
              </div>
            </KTCardBody>
          </KTCard>
        </>
      )}
    </>
  )
}

export default PublicationIndex
