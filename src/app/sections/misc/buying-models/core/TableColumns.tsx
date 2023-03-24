import {Column} from 'react-table'
import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {QUERIES} from '../../../../../_metronic/helpers'
import {BuyingModel} from '../../../../models/misc/BuyingModel';
import {Restricted} from "../../../../modules/auth/AuthAccessControl";
import {BadgesCell} from "../../../../modules/table/columns/BadgesCell";
import {PerformanceMetric} from "../../../../models/misc/PerformanceMetric";

const BuyingModelsColumns: ReadonlyArray<Column<BuyingModel>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name} />,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Related Metrics' className='min-w-125px'/>,
        id: 'performance-metrics',
        Cell: ({...props}) => <BadgesCell texts={props.data[props.row.index].performanceMetrics.map((metric: PerformanceMetric) => metric.name)} color='light-info' align='left'/>,
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
                    path={'misc/buying-models'}
                    queryKey={QUERIES.BUYING_MODELS_LIST}
                    showView={false}
                    showEdit={true}
                    title="Delete Buying Model"
                    text={`Are you sure you want to delete the buying model '${props.data[props.row.index].name}'?`}
                />
            </Restricted>
        ),
    },
]

export {BuyingModelsColumns}
