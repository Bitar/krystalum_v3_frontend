import {Column} from 'react-table'
import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {QUERIES} from '../../../../../_metronic/helpers'
import {Role} from '../../../../models/iam/Role';
import {Permission} from '../../../../models/iam/Permission';
import {truncateText} from '../../../../helpers/stringGenerator';

const RolesColumns: ReadonlyArray<Column<Role>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name} />,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Permissions' className='min-w-125px' />,
        id: 'permissions',
        Cell: ({...props}) => <TextCell text={truncateText(props.data[props.row.index].permissions.map((permission: Permission) => permission.name).join(", "))} />,
    },
    {
        Header: (props) => (
            <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
        ),
        id: 'actions',
        Cell: ({...props}) => (
            <ActionsCell
                id={props.data[props.row.index].id}
                path={'iam/roles'}
                queryKey={QUERIES.ROLES_LIST}
                showView={false}
                showEdit={true}
                title='Delete Role'
                text={`Are you sure you want to delete the role '${props.data[props.row.index].name}'?`}
            />
        ),
    },
]

export {RolesColumns}
