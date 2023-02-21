import {Column} from 'react-table';
import {TextCell} from '../../../../modules/table/columns/TextCell';
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader';
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell';
import {QUERIES} from '../../../../../_metronic/helpers';
import {User} from '../../../../models/iam/User';
import {UserInfoCell} from '../../../../modules/table/columns/UserInfoCell';
import {Role} from '../../../../models/iam/Role';
import {truncateText} from '../../../../helpers/stringGenerator';

const TableColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Profile' className='min-w-125px' />,
    id: 'profile',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Roles' className='min-w-125px' />,
    id: 'roles',
    Cell: ({...props}) => <TextCell text={truncateText(props.data[props.row.index].roles.map((role: Role) => role.name).join(", "))} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => (
      <ActionsCell
        id={props.data[props.row.index].id}
        path={'iam/users'}
        queryKey={QUERIES.USERS_LIST}
        showView={true}
        showEdit={true}
        title="Delete User"
        text={`Are you sure you want to delete the user '${props.data[props.row.index].name}'?`}
      />
    ),
  },
]

export {TableColumns}
