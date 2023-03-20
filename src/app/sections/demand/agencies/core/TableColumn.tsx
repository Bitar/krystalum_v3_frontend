import {Column} from 'react-table'
import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {QUERIES} from '../../../../../_metronic/helpers'
import {Agency} from '../../../../models/demand/Agency';
import {Restricted} from '../../../../modules/auth/AuthAccessControl';

const AgenciesColumns: ReadonlyArray<Column<Agency>> = [
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
        Header: (props) => <CustomHeader tableProps={props} title='Holding Group' className='min-w-125px'/>,
        id: 'holding-group',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].holdingGroup?.name}/>,
    },
    {
        Header: (props) => (
            <Restricted to='manage-demand'>
                <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px'/>
            </Restricted>
        ),
        id: 'actions',
        Cell: ({...props}) => (
            <Restricted to='manage-demand'>
                <ActionsCell
                    id={props.data[props.row.index].id}
                    path={'demand/agencies'}
                    queryKey={QUERIES.AGENCIES_LIST}
                    showView={false}
                    showEdit={true}
                    title="Delete Agency"
                    text={`Are you sure you want to delete the agency '${props.data[props.row.index].name}'?`}
                />
            </Restricted>
        ),
    },
]

export {AgenciesColumns}
