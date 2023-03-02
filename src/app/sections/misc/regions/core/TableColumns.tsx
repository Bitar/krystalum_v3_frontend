import {Column} from 'react-table'
import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {QUERIES} from '../../../../../_metronic/helpers'
import {Region} from '../../../../models/misc/Region';

const RegionsColumns: ReadonlyArray<Column<Region>> = [
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
                path={'misc/regions'}
                queryKey={QUERIES.REGIONS_LIST}
                showView={false}
                showEdit={true}
                title="Delete Region"
                text={`Are you sure you want to delete the region '${props.data[props.row.index].name}'?`}
            />
        ),
    },
]

export {RegionsColumns}
