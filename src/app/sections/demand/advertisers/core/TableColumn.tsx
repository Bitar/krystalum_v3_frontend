import {Column} from 'react-table'
import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {QUERIES} from '../../../../../_metronic/helpers'
import {Advertiser} from '../../../../models/demand/Advertiser';
import {Restricted} from '../../../../modules/auth/AuthAccessControl';

const AdvertisersColumns: ReadonlyArray<Column<Advertiser>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name} />,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Country' className='min-w-125px' />,
        id: 'country',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].info?.country?.name} />,
    },
    {
        Header: (props) => (
            <Restricted to='manage-demand'>
                <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
            </Restricted>
        ),
        id: 'actions',
        Cell: ({...props}) => (
            <Restricted to='manage-demand'>
                <ActionsCell
                    id={props.data[props.row.index].id}
                    path={'demand/advertisers'}
                    queryKey={QUERIES.ADVERTISERS_LIST}
                    showView={false}
                    showEdit={true}
                    title="Delete Advertiser"
                    text={`Are you sure you want to delete the advertiser '${props.data[props.row.index].name}'?`}
                />
            </Restricted>
        ),
    },
]

export {AdvertisersColumns}