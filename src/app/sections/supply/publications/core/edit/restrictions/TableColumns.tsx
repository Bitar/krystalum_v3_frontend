import React from 'react'
import {Column} from 'react-table'
import {QUERIES} from '../../../../../../../_metronic/helpers'
import {GeoTypeEnum} from '../../../../../../enums/Supply/GeoTypeEnum'
import {truncateText} from '../../../../../../helpers/stringGenerator'
import {CampaignRestrictionRequirement} from '../../../../../../models/misc/CampaignRestrictionRequirement'
import {CampaignType} from '../../../../../../models/misc/CampaignType'
import {Format} from '../../../../../../models/misc/Format'
import {WebsitePage} from '../../../../../../models/misc/WebsitePage'
import {
  PublicationCampaignRestriction,
  PublicationCampaignRestrictionGeo,
} from '../../../../../../models/supply/publication/PublicationCampaignRestriction'
import {Restricted} from '../../../../../../modules/auth/AuthAccessControl'
import {ActionsCell} from '../../../../../../modules/table/columns/ActionsCell'
import {BadgeCell} from '../../../../../../modules/table/columns/BadgeCell'
import {CustomHeader} from '../../../../../../modules/table/columns/CustomHeader'
import {TextCell} from '../../../../../../modules/table/columns/TextCell'
import {usePublicationEdit} from '../../PublicationEditContext'

const PublicationCampaignRestrictionsColumns: ReadonlyArray<
  Column<PublicationCampaignRestriction>
> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Geo Type' className='min-w-125px' />,
    id: 'geo-type',
    Cell: ({...props}) => {
      return props.data[props.row.index].geos.length > 0 ? (
        <BadgeCell
          status={props.data[props.row.index].geos[0].geoType.name}
          color={
            props.data[props.row.index].geos[0].geoType.id === GeoTypeEnum.REGION
              ? 'light-primary'
              : 'light-info'
          }
          align='left'
        />
      ) : (
        <TextCell text='N/A'></TextCell>
      )
    },
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Geos' className='min-w-125px' />,
    id: 'geos',
    Cell: ({...props}) => (
      <TextCell
        text={
          props.data[props.row.index].geos.length > 0
            ? props.data[props.row.index].geos
                .map(
                  (publicationCampaignRestrictionGeo: PublicationCampaignRestrictionGeo) =>
                    publicationCampaignRestrictionGeo.geo.name
                )
                .join(', ')
            : 'N/A'
        }
      />
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Formats' className='min-w-125px' />,
    id: 'formats',
    Cell: ({...props}) => (
      <TextCell
        text={
          props.data[props.row.index].formats?.length > 0
            ? truncateText(
                props.data[props.row.index].formats?.map((format: Format) => format.name).join(', ')
              )
            : 'N/A'
        }
      />
    ),
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Campaign types' className='min-w-125px' />
    ),
    id: 'campaign-types',
    Cell: ({...props}) => (
      <TextCell
        text={
          props.data[props.row.index].campaignTypes?.length > 0
            ? truncateText(
                props.data[props.row.index].campaignTypes
                  ?.map((campaignType: CampaignType) => campaignType.name)
                  .join(', ')
              )
            : 'N/A'
        }
      />
    ),
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Website pages' className='min-w-125px' />
    ),
    id: 'website-pages',
    Cell: ({...props}) => (
      <TextCell
        text={
          props.data[props.row.index].websitePages?.length > 0
            ? truncateText(
                props.data[props.row.index].websitePages
                  ?.map((websitePage: WebsitePage) => websitePage.name)
                  .join(', ')
              )
            : 'N/A'
        }
      />
    ),
  },
  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title='Campaign restriction requirements'
        className='min-w-125px'
      />
    ),
    id: 'campaign-restriction-requirements',
    Cell: ({...props}) => (
      <TextCell
        text={
          props.data[props.row.index].requirements?.length > 0
            ? truncateText(
                props.data[props.row.index].requirements
                  ?.map((requirement: CampaignRestrictionRequirement) => requirement.name)
                  .join(', ')
              )
            : 'N/A'
        }
      />
    ),
  },
  {
    Header: (props) => (
      <Restricted to='manage-supply'>
        <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
      </Restricted>
    ),
    id: 'actions',
    Cell: ({...props}) => {
      const {publication} = usePublicationEdit()

      const publicationCampaignRestrictionSummary = `type: ${
        props.data[props.row.index].type.name
      } |
            geo type: ${props.data[props.row.index].geos[0].geoType.name} |
            geos: ${truncateText(
              props.data[props.row.index].formats?.map((format: Format) => format.name).join(', ')
            )} | 
            formats: ${truncateText(
              props.data[props.row.index].formats?.map((format: Format) => format.name).join(', ')
            )} |
            campaign types: ${truncateText(
              props.data[props.row.index].campaignTypes
                ?.map((campaignType: CampaignType) => campaignType.name)
                .join(', ')
            )} |
            website pages: ${truncateText(
              props.data[props.row.index].websitePages
                ?.map((websitePage: WebsitePage) => websitePage.name)
                .join(', ')
            )} |
            campaign restriction requirements: ${truncateText(
              props.data[props.row.index].requirements
                ?.map(
                  (campaignRestrictionRequirement: CampaignRestrictionRequirement) =>
                    campaignRestrictionRequirement.name
                )
                .join(', ')
            )} `

      return (
        <Restricted to='manage-supply'>
          <ActionsCell
            id={props.data[props.row.index].id}
            path={`supply/publications/${publication?.id}/restrictions`}
            queryKey={QUERIES.PUBLICATION_CAMPAIGN_RESTRICTIONS_LIST}
            showView={false}
            showEdit={true}
            showDelete={true}
            title='Delete Publication Campaign Restriction'
            text={`Are you sure you want to delete the publication campaign restriction that includes the following details: '${publicationCampaignRestrictionSummary}'?`}
          />
        </Restricted>
      )
    },
  },
]

export {PublicationCampaignRestrictionsColumns}
