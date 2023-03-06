import {Column} from 'react-table'

import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {QUERIES} from '../../../../../_metronic/helpers'
import {BusinessUnit} from '../../../../models/misc/BusinessUnit';
import {Restricted, useAccessControl} from '../../../../modules/auth/AuthAccessControl';

const BusinessUnitsColumns: ReadonlyArray<Column<BusinessUnit>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name} />,
    },
    {
        Header: (props) => (
            <Restricted to='manage-misc'>
                <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
            </Restricted>
        ),
        id: 'actions',
        Cell: ({...props}) => {
            const accessControl = useAccessControl();

            return (<ActionsCell
                id={props.data[props.row.index].id}
                path={'misc/business-units'}
                queryKey={QUERIES.BUSINESS_UNITS_LIST}
                showView={true}
                showEdit={accessControl.userCan('manage-misc')}
                showDelete={accessControl.userCan('manage-misc')}
                title="Delete Business Units"
                text={`Are you sure you want to delete the business unit '${props.data[props.row.index].name}'?`}
            />)
        },
    },
]

export {BusinessUnitsColumns}
