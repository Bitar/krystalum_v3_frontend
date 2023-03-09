import {Column} from 'react-table'

import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {QUERIES} from '../../../../../_metronic/helpers'
import {Restricted} from '../../../../modules/auth/AuthAccessControl';
import {Tier} from '../../../../models/misc/Tier';

const TierColumns: ReadonlyArray<Column<Tier>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px'/>,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Order' className='min-w-125px'/>,
        id: 'order',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].order}/>,
    },
    {
        Header: (props) => (
            <Restricted to='manage-misc'>
                <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px'/>
            </Restricted>
        ),
        id: 'actions',
        Cell: ({...props}) => (
            <Restricted to={'manage-misc'}>
                <ActionsCell
                    id={props.data[props.row.index].id}
                    path={'misc/tiers'}
                    queryKey={QUERIES.TIERS_LIST}
                    showView={false}
                    showEdit={true}
                    showDelete={true}
                    title="Delete Tier"
                    text={`Are you sure you want to delete the tier '${props.data[props.row.index].name}'?`}
                />
            </Restricted>
        ),
    },
]

export {TierColumns}
