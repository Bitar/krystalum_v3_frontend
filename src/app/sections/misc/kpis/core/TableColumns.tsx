import {Column} from 'react-table';

import {TextCell} from '../../../../modules/table/columns/TextCell';
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader';
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell';
import {QUERIES} from '../../../../../_metronic/helpers';
import {Kpi} from '../../../../models/misc/Kpi';
import {BadgeCell} from '../../../../modules/table/columns/BadgeCell';

const KpisColumns: ReadonlyArray<Column<Kpi>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px'/>,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Attributes' className='min-w-125px'/>,
        id: 'attributes',
        Cell: ({...props}) => <><BadgeCell status={props.data[props.row.index].is_rate ? 'Rate' : 'Decimal'}
                                           color='info'/> <BadgeCell
            status={props.data[props.row.index].is_conversion ? 'Conversion' : 'Not Conversion'} color='success'/></>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Related Metric' className='min-w-125px'/>,
        id: 'related-metric',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].metric.name}/>,
    },
    {
        Header: (props) => (
            <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px'/>
        ),
        id: 'actions',
        Cell: ({...props}) => (
            <ActionsCell
                id={props.data[props.row.index].id}
                path={'iam/kpis'}
                queryKey={QUERIES.KPIS_LIST}
                showView={false}
                showEdit={true}
                title="Delete KPI"
                text={`Are you sure you want to delete the KPI '${props.data[props.row.index].name}'?`}
            />
        ),
    },
]

export {KpisColumns}
