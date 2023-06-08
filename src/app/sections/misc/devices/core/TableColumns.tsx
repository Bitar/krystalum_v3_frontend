import {Column} from 'react-table'
import {QUERIES} from '../../../../../_metronic/helpers'
import {Device} from '../../../../models/misc/Device';
import {Restricted} from "../../../../modules/auth/AuthAccessControl";
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {TextCell} from '../../../../modules/table/columns/TextCell'

const DevicesColumns: ReadonlyArray<Column<Device>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px'/>,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name}/>,
    },
    {
        Header: (props) => (
            <Restricted to={'manage-misc'}>
                <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px'/>
            </Restricted>
        ),
        id: 'actions',
        Cell: ({...props}) => (
            <Restricted to={'manage-misc'}>
                <ActionsCell
                    id={props.data[props.row.index].id}
                    path={'misc/devices'}
                    queryKey={QUERIES.DEVICES_LIST}
                    showView={false}
                    showEdit={true}
                    title="Delete Device"
                    text={`Are you sure you want to delete the device '${props.data[props.row.index].name}'?`}
                />
            </Restricted>
        ),
    },
]

export {DevicesColumns}
