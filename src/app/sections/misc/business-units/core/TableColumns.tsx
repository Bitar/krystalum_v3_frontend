import {Column} from 'react-table'
import {QUERIES} from '../../../../../_metronic/helpers'
import {BusinessUnit} from '../../../../models/misc/BusinessUnit';
import {Restricted} from '../../../../modules/auth/AuthAccessControl';
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'

import {TextCell} from '../../../../modules/table/columns/TextCell'

const BusinessUnitsColumns: ReadonlyArray<Column<BusinessUnit>> = [
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
                    path={'misc/business-units'}
                    queryKey={QUERIES.BUSINESS_UNITS_LIST}
                    showView={false}
                    showEdit={true}
                    showDelete={true}
                    title="Delete Business Unit"
                    text={`Are you sure you want to delete the business unit '${props.data[props.row.index].name}'?`}
                />
            </Restricted>
        ),
    },
]

export {BusinessUnitsColumns}
