import {Column} from 'react-table'
import React from 'react';
import {CustomHeader} from '../../../../../../modules/table/columns/CustomHeader';
import {TextCell} from '../../../../../../modules/table/columns/TextCell';
import {BadgeCell} from '../../../../../../modules/table/columns/BadgeCell';
import {CampaignOrder} from '../../../../../../models/demand/CampaignOrder';
import {Restricted} from '../../../../../../modules/auth/AuthAccessControl';
import {ActionsCell} from '../../../../../../modules/table/columns/ActionsCell';
import {QUERIES} from '../../../../../../../_metronic/helpers';
import {RoleEnum} from '../../../../../../enums/RoleEnum';
import {useAuth} from '../../../../../../modules/auth';
import {useCampaign} from '../../CampaignContext';
import {BookingTypeEnum} from '../../../../../../enums/BookingTypeEnum';

const CampaignOrderColumns: ReadonlyArray<Column<CampaignOrder>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title="ID" className="min-w-125px"/>,
        id: 'id',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].id}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Booking order number" className="min-w-125px"/>,
        id: 'booking-order-number',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].booking_order_number}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Status" className="min-w-125px"/>,
        id: 'status',
        Cell: ({...props}) => <BadgeCell status={'TODO'} color={'success'} align={'left'}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Formats" className="min-w-150px"/>,
        id: 'formats',
        Cell: ({...props}) => <TextCell text={'TODO'}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Booked amount" className="min-w-125px"/>,
        id: 'booked-amount',
        Cell: ({...props}) => <TextCell text={'TODO'}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Created at" className="min-w-125px"/>,
        id: 'created-at',
        Cell: ({...props}) => <TextCell text={'TODO'}/>,
    },
    {
        Header: (props) => (
            <Restricted to='manage-demand'>
                <CustomHeader tableProps={props} title='Actions' className='text-end min-w-150px'/>
            </Restricted>
        ),
        id: 'actions',
        Cell: ({...props}) => {
            const {currentUser, hasAnyRoles} = useAuth();
            const {campaign} = useCampaign();

            // only the owner of the campaign or the admin can edit the orders of a campaign
            let showEdit = false;

            if(campaign && currentUser) {
                showEdit = (hasAnyRoles(currentUser, [RoleEnum.DEMAND]) && campaign.owner !== null && campaign.owner.id === currentUser.id)
                    || hasAnyRoles(currentUser, [RoleEnum.HEAD_OF_DEMAND, RoleEnum.ADMINISTRATOR, RoleEnum.CAMPAIGN_EDITOR]);
            }

            let campaignOrderIdentifier = props.data[props.row.index].id;

            if(campaign !== null && campaign.bookingType.id === BookingTypeEnum.BO && props.data[props.row.index].booking_order_number !== null) {
                campaignOrderIdentifier = props.data[props.row.index].booking_order_number;
            }

            return (<Restricted to='manage-demand'>
                <ActionsCell
                    id={props.data[props.row.index].id}
                    path={`demand/campaigns/${campaign?.id}/orders`}
                    queryKey={QUERIES.CAMPAIGNS_LIST}
                    showView={false}
                    showEdit={showEdit}
                    showDelete={showEdit}
                    title="Delete Campaign Order"
                    text={`Are you sure you want to delete the campaign order '${campaignOrderIdentifier}'?`}
                />
            </Restricted>)
        },
    },
]

export {CampaignOrderColumns}