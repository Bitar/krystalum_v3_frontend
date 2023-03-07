import {Column} from 'react-table'
import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {QUERIES} from '../../../../../_metronic/helpers'
import {City} from '../../../../models/misc/City';
import {Restricted} from "../../../../modules/auth/AuthAccessControl";

const CitiesColumns: ReadonlyArray<Column<City>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name} />,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Country' className='min-w-125px' />,
        id: 'country',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].country.name} />,
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
                    path={'misc/cities'}
                    queryKey={QUERIES.CITY_LIST}
                    showView={false}
                    showEdit={true}
                    title="Delete City"
                    text={`Are you sure you want to delete the city '${props.data[props.row.index].name}'?`}
                />
            </Restricted>
        ),
    },
]

export {CitiesColumns}
