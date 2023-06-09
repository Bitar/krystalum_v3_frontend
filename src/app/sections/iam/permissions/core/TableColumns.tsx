import {Column} from 'react-table'
import {QUERIES} from '../../../../../_metronic/helpers'
import {Permission} from '../../../../models/iam/Permission';
import {Restricted} from '../../../../modules/auth/AuthAccessControl';
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {TextCell} from '../../../../modules/table/columns/TextCell'

const PermissionsColumns: ReadonlyArray<Column<Permission>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name} />,
    },
    {
        Header: (props) => (
            <Restricted to='manage-iam'>
                <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
            </Restricted>
        ),
        id: 'actions',
        Cell: ({...props}) => (
            <Restricted to='manage-iam'>
                <ActionsCell
                    id={props.data[props.row.index].id}
                    path={'iam/permissions'}
                    queryKey={QUERIES.PERMISSIONS_LIST}
                    showView={false}
                    showEdit={true}
                    title="Delete Permission"
                    text={`Are you sure you want to delete the permission '${props.data[props.row.index].name}'?`}
                />
            </Restricted>
        ),
    },
]

export {PermissionsColumns}
