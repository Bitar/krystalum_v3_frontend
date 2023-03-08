import {Column} from 'react-table'

import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {QUERIES} from '../../../../../_metronic/helpers'
import {Objective} from '../../../../models/misc/Objective';
import {Restricted, useAccessControl} from '../../../../modules/auth/AuthAccessControl';

const ObjectivesColumns: ReadonlyArray<Column<Objective>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px'/>,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name}/>,
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
                    path={'misc/objectives'}
                    queryKey={QUERIES.OBJECTIVES_LIST}
                    showView={false}
                    showEdit={true}
                    showDelete={true}
                    title="Delete Objective"
                    text={`Are you sure you want to delete the objective '${props.data[props.row.index].name}'?`}
                />
            </Restricted>
        ),
    },
]

export {ObjectivesColumns}
