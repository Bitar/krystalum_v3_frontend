import {Column} from 'react-table'

import {TextCell} from '../../../../modules/table/columns/TextCell';
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader';
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell';
import {QUERIES} from '../../../../../_metronic/helpers';
import {Format} from '../../../../models/misc/Format';
import {Restricted, useAccessControl} from '../../../../modules/auth/AuthAccessControl';

const FormatsColumns: ReadonlyArray<Column<Format>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px'/>,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Code' className='min-w-125px'/>,
        id: 'code',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].code}/>,
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
        Cell: ({...props}) => {
            const accessControl = useAccessControl();

            return (<ActionsCell
                id={props.data[props.row.index].id}
                path={'misc/formats'}
                queryKey={QUERIES.FORMATS_LIST}
                showEdit={accessControl.userCan('manage-misc')}
                showDelete={accessControl.userCan('manage-misc')}
                title="Delete Formats"
                text={`Are you sure you want to delete the formats '${props.data[props.row.index].name}'?`}
            />)
        },
    },
]

export {FormatsColumns}