import {Column} from 'react-table'

import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {QUERIES} from '../../../../../_metronic/helpers'
import {Restricted} from '../../../../modules/auth/AuthAccessControl';
import {HoldingGroup} from '../../../../models/demand/HoldingGroup';

const HoldingGroupsColumns: ReadonlyArray<Column<HoldingGroup>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px'/>,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Region' className='min-w-125px'/>,
        id: 'region',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].region.name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Trading Desk' className='min-w-125px'/>,
        id: 'trading-desk',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].tradingDesk?.name}/>,
    },
    {
        Header: (props) => (
            <Restricted to='manage-demand'>
                <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px'/>
            </Restricted>
        ),
        id: 'actions',
        Cell: ({...props}) => (
            <Restricted to={'manage-demand'}>
                <ActionsCell
                    id={props.data[props.row.index].id}
                    path={'demand/holding-groups'}
                    queryKey={QUERIES.HOLDING_GROUPS_LIST}
                    showView={false}
                    showEdit={true}
                    showDelete={true}
                    title="Delete Holding Group"
                    text={`Are you sure you want to delete the holding group '${props.data[props.row.index].name}'?`}
                />
            </Restricted>
        ),
    },
]

export {HoldingGroupsColumns}
