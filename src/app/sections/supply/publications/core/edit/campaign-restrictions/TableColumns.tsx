import React from 'react';
import {Column} from 'react-table'
import {QUERIES} from '../../../../../../../_metronic/helpers';
import {GeoTypeEnum} from '../../../../../../enums/Supply/GeoTypeEnum';
import {
    PublicationCampaignRestriction
} from '../../../../../../models/supply/publication/PublicationCampaignRestriction';
import {Restricted} from '../../../../../../modules/auth/AuthAccessControl';
import {ActionsCell} from '../../../../../../modules/table/columns/ActionsCell';
import {BadgeCell} from '../../../../../../modules/table/columns/BadgeCell';
import {CustomHeader} from '../../../../../../modules/table/columns/CustomHeader';
import {TextCell} from '../../../../../../modules/table/columns/TextCell';
import {usePublicationEdit} from '../../PublicationEditContext';

const PublicationCampaignRestrictionsColumns: ReadonlyArray<Column<PublicationCampaignRestriction>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title="Format" className="min-w-125px"/>,
        id: 'format',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].format?.name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Geo Type" className="min-w-125px"/>,
        id: 'geo-type',
        Cell: ({...props}) => <BadgeCell status={props.data[props.row.index].geoType.name}
                                         color={props.data[props.row.index].geoType.id === GeoTypeEnum.REGION ? 'light-primary' : 'light-info'}
                                         align="left"/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Geo" className="min-w-125px"/>,
        id: 'geo',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].geo?.name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Campaign type" className="min-w-125px"/>,
        id: 'campaign-type',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].campaignType?.name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Website page" className="min-w-125px"/>,
        id: 'website-page',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].websitePage?.name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Campaign restriction requirement"
                                         className="min-w-125px"/>,
        id: 'campaign-restriction-requirement',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].campaignRestrictionRequirement?.name}/>,
    },
    {
        Header: (props) => (
            <Restricted to="manage-supply">
                <CustomHeader tableProps={props} title="Actions" className="text-end min-w-100px"/>
            </Restricted>
        ),
        id: 'actions',
        Cell: ({...props}) => {
            const {publication} = usePublicationEdit();

            const publicationCampaignRestrictionSummary = `type: ${props.data[props.row.index].type.name} | 
            format: ${props.data[props.row.index].format.name} | 
            geo type: ${props.data[props.row.index].geoType.name} | 
            geo: ${props.data[props.row.index].geo.name} | 
            campaign type: ${props.data[props.row.index].campaignType.name} | 
            website page: ${props.data[props.row.index].websitePage.name} | 
            campaign restriction requirement: ${props.data[props.row.index].campaignRestrictionRequirement.name} `;

            return (
                <Restricted to={'manage-supply'}>
                    <ActionsCell
                        id={props.data[props.row.index].id}
                        path={`supply/publications/${publication?.id}/campaign-restrictions`}
                        queryKey={QUERIES.PUBLICATION_CAMPAIGN_RESTRICTIONS_LIST}
                        showView={false}
                        showEdit={true}
                        showDelete={true}
                        title="Delete Publication Campaign Restriction"
                        text={`Are you sure you want to delete the publication campaign restriction that includes the following details: '${publicationCampaignRestrictionSummary}'?`}
                    />
                </Restricted>
            )
        }
    },
]

export {PublicationCampaignRestrictionsColumns}
