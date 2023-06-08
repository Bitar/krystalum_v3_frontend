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
import {EXPORT_ENDPOINT, getPublishers} from '../../../../requests/supply/publisher/Publisher'
import {getPublisherColumns} from '../core/TableColumns'
import PublisherIndexFilter from '../partials/filters/IndexFilter'

const PublisherIndex: React.FC = () => {
  const {currentUser, hasRoles} = useAuth()
  const krysApp = useKrysApp()

  const [exportQuery, setExportQuery] = useState<string>('')
  const [showFilter, setShowFilter] = useState<boolean>(false)

  useEffect(() => {
    krysApp.setPageTitle(generatePageTitle(Sections.SUPPLY_PUBLISHERS, PageTypes.INDEX))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <KrysIndex
        queryId={QUERIES.PUBLISHERS_LIST}
        requestFunction={getPublishers}
        columnsArray={getPublisherColumns(hasRoles(currentUser, [RoleEnum.PUBLISHER]))}
        cardHeader={{
          text: 'All Publishers',
          actions: [
            new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
            new FilterCardAction('publishers-list-filter', showFilter, setShowFilter),
            new CreateCardAction('/supply/publishers', 'manage-supply'),
          ],
        }}
        showFilter={showFilter}
        setExportQuery={setExportQuery}
        FilterComponent={PublisherIndexFilter}
      ></KrysIndex>

      {!hasRoles(currentUser, [RoleEnum.PUBLISHER]) && (
        <>
          {/* Archived Publishers */}
          <KTCard className='mt-8'>
            <KTCardBody>
              <div className='row'>
                <div className='col-12'>
                  <EngageWidget
                    backgroundColor={'rgb(102, 50, 89)'}
                    backgroundPosition={'right center'}
                    backgroundImage={'/media/illustrations/sigma-1/5.png'}
                    title={'Archived Publishers'}
                    text={
                      "Browse through the list of publishers that don't have publications that are currently receiving inventory"
                    }
                    ctaText={'Go to Archived Publishers'}
                    ctaUrl={'/supply/publishers/archived'}
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

export default PublisherIndex
