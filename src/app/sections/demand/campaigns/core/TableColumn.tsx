import {Column} from 'react-table'
import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {QUERIES} from '../../../../../_metronic/helpers'
import {Campaign} from '../../../../models/demand/Campaign';
import {Restricted} from '../../../../modules/auth/AuthAccessControl';
import {truncateText} from '../../../../helpers/stringGenerator';

const CampaignsColumns: ReadonlyArray<Column<Campaign>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
        id: 'name',
        Cell: ({...props}) => <TextCell text={truncateText(props.data[props.row.index].name, 30)} />,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Unique Identifier' className='min-w-125px' />,
        id: 'unique-identifier',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].unique_identifier} />,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Advertiser' className='min-w-125px' />,
        id: 'advertiser',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].advertiser.name} />,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Agency' className='min-w-125px' />,
        id: 'agency',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].agency?.name} />,
    },
    // tODO put this back
    // {
    //     Header: (props) => <CustomHeader tableProps={props} title='Publisher' className='min-w-125px' />,
    //     id: 'publisher',
    //     Cell: ({...props}) => <TextCell text={props.data[props.row.index].publisher?.name} />,
    // },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Booking type' className='min-w-125px' />,
        id: 'booking-type',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].bookingType.name} />,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Buy type' className='min-w-125px' />,
        id: 'buy-type',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].buyType ? `${props.data[props.row.index].buyType?.name} (${props.data[props.row.index].buyType?.code})`: ''} />,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Booked amount' className='min-w-125px' />,
        id: 'booked-amount',
        Cell: ({...props}) => <TextCell text='TODO' />,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Status' className='min-w-125px' />,
        id: 'status',
        Cell: ({...props}) => <TextCell text='TODO' />,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Owner' className='min-w-125px' />,
        id: 'owner',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].owner?.name} />,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Date created' className='min-w-125px' />,
        id: 'created-at',
        Cell: ({...props}) => <TextCell text={new Date(props.data[props.row.index].created_at).toDateString()} />,
    },
    {
        Header: (props) => (
            <Restricted to='manage-demand'>
                <CustomHeader tableProps={props} title='Actions' className='text-end min-w-150px' />
            </Restricted>
        ),
        id: 'actions',
        Cell: ({...props}) => (
            <Restricted to='manage-demand'>
                <ActionsCell
                    id={props.data[props.row.index].id}
                    path={'demand/campaigns'}
                    queryKey={QUERIES.CAMPAIGNS_LIST}
                    showView={false}
                    showEdit={true}
                    showDelete={true}
                    title="Delete Campaign"
                    text={`Are you sure you want to delete the campaign '${props.data[props.row.index].name}'?`}
                />
            </Restricted>
        ),
    },
]

export {CampaignsColumns}
