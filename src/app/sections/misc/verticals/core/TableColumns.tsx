import {Column} from 'react-table'

import {TextCell} from '../../../../modules/table/columns/TextCell';
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader';
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell';
import {QUERIES} from '../../../../../_metronic/helpers';
import {Vertical} from '../../../../models/misc/Vertical';

const VerticalsColumns: ReadonlyArray<Column<Vertical>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px'/>,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='parent' className='min-w-125px'/>,
        id: 'parent',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].parent?.name}/>,
    },
    {
        Header: (props) => (
            <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px'/>
        ),
        id: 'actions',
        Cell: ({...props}) => (
            <ActionsCell
                id={props.data[props.row.index].id}
                path={'misc/verticals'}
                queryKey={QUERIES.VERTICALS_LIST}
                showView={false}
                showEdit={true}
                title="Delete Vertical"
                text={`Are you sure you want to delete the vertical '${props.data[props.row.index].name}'?`}
            />
        ),
    },
]

export {VerticalsColumns}
