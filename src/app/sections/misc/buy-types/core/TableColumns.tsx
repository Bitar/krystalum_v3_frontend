import {Column} from 'react-table'
import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {QUERIES} from '../../../../../_metronic/helpers'
import {BuyType} from '../../../../models/misc/BuyType';

const BuyTypesColumns: ReadonlyArray<Column<BuyType>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name} />,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Code' className='min-w-125px' />,
        id: 'code',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].code} />,
    },
    {
        Header: (props) => (
            <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
        ),
        id: 'actions',
        Cell: ({...props}) => (
            <ActionsCell
                id={props.data[props.row.index].id}
                path={'misc/buy-types'}
                queryKey={QUERIES.BUY_TYPE_LIST}
                showView={false}
                showEdit={true}
                title="Delete Buy Type"
                text={`Are you sure you want to delete the buy type '${props.data[props.row.index].name}'?`}
            />
        ),
    },
]

export {BuyTypesColumns}
