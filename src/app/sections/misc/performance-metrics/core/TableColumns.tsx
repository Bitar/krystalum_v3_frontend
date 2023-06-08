import {Column} from 'react-table'
import {QUERIES} from '../../../../../_metronic/helpers'
import {PerformanceMetric} from '../../../../models/misc/PerformanceMetric';
import {Restricted} from '../../../../modules/auth/AuthAccessControl';
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'

import {TextCell} from '../../../../modules/table/columns/TextCell'

const PerformanceMetricsColumns: ReadonlyArray<Column<PerformanceMetric>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px'/>,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Title' className='min-w-125px'/>,
        id: 'title',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].title}/>,
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
                    path={'misc/performance-metrics'}
                    queryKey={QUERIES.PERFORMANCE_METRICS_LIST}
                    showView={false}
                    showEdit={true}
                    showDelete={true}
                    title="Delete Performance Metric"
                    text={`Are you sure you want to delete the performance metric '${props.data[props.row.index].name}'?`}
                />
            </Restricted>
        ),
    },
]

export {PerformanceMetricsColumns}
