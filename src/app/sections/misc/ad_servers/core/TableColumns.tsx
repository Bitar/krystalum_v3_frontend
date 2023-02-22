import {Column} from 'react-table'

import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {QUERIES} from '../../../../../_metronic/helpers'
import {AdServer} from '../../../../models/misc/AdServer';

const AdServersColumns: ReadonlyArray<Column<AdServer>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name} />,
    },
    {
        Header: (props) => (
            <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
        ),
        id: 'actions',
        Cell: ({...props}) => (
            <ActionsCell
                id={props.data[props.row.index].id}
                path={'iam/ad-servers'}
                queryKey={QUERIES.AD_SERVERS_LIST}
                showView={false}
                showEdit={true}
                title="Delete Ad Server"
                text={`Are you sure you want to delete the ad server '${props.data[props.row.index].name}'?`}
            />
        ),
    },
]

export {AdServersColumns}
