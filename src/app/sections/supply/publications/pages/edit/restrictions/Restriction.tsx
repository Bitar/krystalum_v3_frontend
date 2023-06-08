import React, {useEffect, useState} from 'react'
import {KTCard, KTCardBody} from '../../../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../../../_metronic/helpers/components/KTCardHeader'
import {SelectCardAction} from '../../../../../../components/misc/CardAction'
import {PublicationRestrictionTypeEnum} from '../../../../../../enums/Supply/PublicationRestrictionTypeEnum'
import {genericSingleSelectOnChangeHandler} from '../../../../../../helpers/form'
import {DEFAULT_CAMPAIGN_RESTRICTION_TYPE} from '../../../../../../helpers/settings'
import {CampaignRestrictionType} from '../../../../../../models/supply/Options'
import {
  CampaignRestrictionsFilterFields,
  defaultCampaignRestrictionsFilterFields,
  defaultPublicationCampaignRestrictionFormFields,
  PublicationCampaignRestrictionFormFields,
} from '../../../core/edit/restrictions/form'
import {usePublication} from '../../../core/PublicationContext'
import {usePublicationEdit} from '../../../core/PublicationEditContext'
import PublicationCampaignRestrictionMetaCreate from './partials/CreateMeta'
import PublicationCampaignRestrictionCreate from './partials/CreateRestriction'

const PublicationCampaignRestriction: React.FC = () => {
  const {options} = usePublication()
  const {publication} = usePublicationEdit()

  const [form, setForm] = useState<PublicationCampaignRestrictionFormFields>(
    defaultPublicationCampaignRestrictionFormFields
  )
  const [filters, setFilters] = useState<CampaignRestrictionsFilterFields>(
    defaultCampaignRestrictionsFilterFields
  )
  const [refreshTable, setRefreshTable] = useState<boolean>(false)

  const [campaignRestrictionTypes, setCampaignRestrictionTypes] = useState<
    CampaignRestrictionType[]
  >([])
  const [currentCampaignRestrictionTypeFormatted, setCurrentCampaignRestrictionTypeFormatted] =
    useState<string>(DEFAULT_CAMPAIGN_RESTRICTION_TYPE.name)

  const {restrictionTypes} = options

  useEffect(() => {
    if (publication) {
      setCampaignRestrictionTypes(restrictionTypes)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publication])

  const selectChangeHandler = (e: any, key: string) => {
    genericSingleSelectOnChangeHandler(e, form, setForm, key)

    if (key === 'type' && e) {
      const type = campaignRestrictionTypes.find(
        (campaignRestrictionType) => campaignRestrictionType.id === e.id
      )

      if (type) {
        setCurrentCampaignRestrictionTypeFormatted(type.name)
        setFilters({...filters, type: e.id})
      }

      // as long as we are updating the create form, we should set the table refresh to false
      setRefreshTable(true)
    }
  }

  return (
    <KTCard className='card-bordered border-1'>
      <KTCardHeader
        text='Add New Campaign Restriction'
        actions={[
          new SelectCardAction(
            'manage-supply',
            campaignRestrictionTypes,
            'Select campaign restriction type',
            selectChangeHandler,
            'type',
            DEFAULT_CAMPAIGN_RESTRICTION_TYPE
          ),
        ]}
      />

      <KTCardBody>
        {form.type === PublicationRestrictionTypeEnum.META_RESTRICTIONS ? (
          <PublicationCampaignRestrictionMetaCreate />
        ) : (
          <PublicationCampaignRestrictionCreate
            currentCampaignRestrictionTypeFormatted={currentCampaignRestrictionTypeFormatted}
            filters={filters}
            refreshTable={refreshTable}
            setRefreshTable={setRefreshTable}
          />
        )}
      </KTCardBody>
    </KTCard>
  )
}

export default PublicationCampaignRestriction
