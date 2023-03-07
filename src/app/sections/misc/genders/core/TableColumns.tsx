import {Column} from 'react-table'
import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {QUERIES} from '../../../../../_metronic/helpers'
import {Gender} from '../../../../models/misc/Gender';

const GendersColumns: ReadonlyArray<Column<Gender>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px'/>,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name}/>,
    },
    {
        Header: (props) => (
            <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px'/>
        ),
        id: 'actions',
        Cell: ({...props}) => (
            <ActionsCell
                id={props.data[props.row.index].id}
                path={'misc/genders'}
                queryKey={QUERIES.GENDERS_LIST}
                showView={false}
                showEdit={true}
                title="Delete Gender"
                text={`Are you sure you want to delete the gender '${props.data[props.row.index].name}'?`}
            />
        ),
    },
]

export {GendersColumns}