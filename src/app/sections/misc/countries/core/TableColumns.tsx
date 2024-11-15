import {Column} from 'react-table'
import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {QUERIES} from '../../../../../_metronic/helpers'
import {Country} from '../../../../models/misc/Country';
import {Restricted} from "../../../../modules/auth/AuthAccessControl";

const CountriesColumns: ReadonlyArray<Column<Country>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name} />,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Code' className='min-w-125px' />,
        id: 'code',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].code} />,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Currency' className='min-w-125px' />,
        id: 'currency',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].currency} />,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Phone Code' className='min-w-125px' />,
        id: 'phone_code',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].phone_code} />,
    },
    {
        Header: (props) => (
            <Restricted to={'manage-misc'}>
                <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
            </Restricted>
        ),
        id: 'actions',
        Cell: ({...props}) => (
            <Restricted to={'manage-misc'}>
                <ActionsCell
                    id={props.data[props.row.index].id}
                    path={'misc/countries'}
                    queryKey={QUERIES.COUNTRIES_LIST}
                    showView={false}
                    showEdit={true}
                    title="Delete Country"
                    text={`Are you sure you want to delete the country '${props.data[props.row.index].name}'?`}
                />
            </Restricted>
        ),
    },
]

export {CountriesColumns}
