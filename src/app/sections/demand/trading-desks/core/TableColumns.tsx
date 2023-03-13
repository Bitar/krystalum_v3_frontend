import {Column} from 'react-table'

import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {QUERIES} from '../../../../../_metronic/helpers'
import {Restricted} from '../../../../modules/auth/AuthAccessControl';
import {TradingDesk} from '../../../../models/demand/TradingDesk';

const TradingDesksColumns: ReadonlyArray<Column<TradingDesk>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px'/>,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name}/>,
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
                    path={'demand/trading-desks'}
                    queryKey={QUERIES.TRADING_DESKS_LIST}
                    showView={false}
                    showEdit={true}
                    showDelete={true}
                    title="Delete Trading Desk"
                    text={`Are you sure you want to delete the trading desk '${props.data[props.row.index].name}'?`}
                />
            </Restricted>
        ),
    },
]

export {TradingDesksColumns}
