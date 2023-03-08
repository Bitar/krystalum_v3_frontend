import {Column} from 'react-table';

import {TextCell} from '../../../../modules/table/columns/TextCell';
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader';
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell';
import {QUERIES} from '../../../../../_metronic/helpers';
import {Kpi} from '../../../../models/misc/Kpi';
import {BadgeCell} from '../../../../modules/table/columns/BadgeCell';
import {BadgesCell} from '../../../../modules/table/columns/BadgesCell';
import {PerformanceMetric} from '../../../../models/misc/PerformanceMetric';
import {Restricted, useAccessControl} from '../../../../modules/auth/AuthAccessControl';

const KpisColumns: ReadonlyArray<Column<Kpi>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px'/>,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Is rate?' className='min-w-125px'/>,
        id: 'is_rate',
        Cell: ({...props}) => <><BadgeCell status={props.data[props.row.index].is_rate ? 'Yes' : 'No'}
                                           color={props.data[props.row.index].is_rate ? 'light-success' : 'light-danger'}
                                           align='left'/></>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Is conversion?' className='min-w-125px'/>,
        id: 'is_conversion',
        Cell: ({...props}) => <><BadgeCell status={props.data[props.row.index].is_conversion ? 'Yes' : 'No'}
                                           color={props.data[props.row.index].is_conversion ? 'light-success' : 'light-danger'}
                                           align='left'/></>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Related Metrics' className='min-w-125px'/>,
        id: 'performance-metrics',
        Cell: ({...props}) => <BadgesCell
            texts={props.data[props.row.index].performanceMetrics.map((metric: PerformanceMetric) => metric.name)}
            color='light-info' align='left'/>,
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
                    path={'misc/kpis'}
                    queryKey={QUERIES.KPIS_LIST}
                    showView={false}
                    showEdit={true}
                    showDelete={true}
                    title="Delete Kpi"
                    text={`Are you sure you want to delete the kpi '${props.data[props.row.index].name}'?`}
                />
            </Restricted>
        ),
    },
]

export {KpisColumns}
