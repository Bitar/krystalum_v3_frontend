import {Column} from 'react-table'
import {QUERIES} from '../../../../../_metronic/helpers'
import {BuyType} from '../../../../models/misc/BuyType';
import {Restricted} from "../../../../modules/auth/AuthAccessControl";
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {TextCell} from '../../../../modules/table/columns/TextCell'

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
            <Restricted to={'manage-misc'}>
                <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
            </Restricted>
        ),
        id: 'actions',
        Cell: ({...props}) => (
            <Restricted to={'manage-misc'}>
                <ActionsCell
                    id={props.data[props.row.index].id}
                    path={'misc/buy-types'}
                    queryKey={QUERIES.BUY_TYPE_LIST}
                    showView={false}
                    showEdit={true}
                    title="Delete Buy Type"
                    text={`Are you sure you want to delete the buy type '${props.data[props.row.index].name}'?`}
                />
            </Restricted>
        ),
    },
]

export {BuyTypesColumns}
