import {Column} from 'react-table'
import {QUERIES} from '../../../../../_metronic/helpers';
import {Vertical} from '../../../../models/misc/Vertical';
import {Restricted} from '../../../../modules/auth/AuthAccessControl';
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell';
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader';

import {TextCell} from '../../../../modules/table/columns/TextCell';

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

            <Restricted to='manage-misc'>
                <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px'/>
            </Restricted>

        ),
        id: 'actions',
        Cell: ({...props}) => (
            <Restricted to={'manage-misc'}>
                <ActionsCell
                    id={props.data[props.row.index].id}
                    path={'misc/verticals'}
                    queryKey={QUERIES.VERTICALS_LIST}
                    showView={false}
                    showEdit={true}
                    showDelete={true}
                    title="Delete Vertical"
                    text={`Are you sure you want to delete the verticals '${props.data[props.row.index].name}'?`}
                />
            </Restricted>
        ),
    },
]

export {VerticalsColumns}
