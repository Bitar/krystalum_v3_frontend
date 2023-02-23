import {Column} from 'react-table'
import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {QUERIES} from '../../../../../_metronic/helpers'
import {BuyingModel} from '../../../../models/misc/BuyingModel';

const BuyingModelsColumns: ReadonlyArray<Column<BuyingModel>> = [
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
                path={'misc/buying-models'}
                queryKey={QUERIES.BUYING_MODEL_LIST}
                showView={false}
                showEdit={true}
                title="Delete Buying Model"
                text={`Are you sure you want to delete the buying model '${props.data[props.row.index].name}'?`}
            />
        ),
    },
]

export {BuyingModelsColumns}
