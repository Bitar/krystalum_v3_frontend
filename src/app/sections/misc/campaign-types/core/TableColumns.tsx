import {Column} from 'react-table'
import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {QUERIES} from '../../../../../_metronic/helpers'
import {CampaignType} from '../../../../models/misc/CampaignType';

const CampaignTypesColumns: ReadonlyArray<Column<CampaignType>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px'/>,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name}/>,
    },
    {
        Header: (props) => (
            <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px'/>
        ),
        id: 'actions',
        Cell: ({...props}) => (
            <ActionsCell
                id={props.data[props.row.index].id}
                path={'misc/campaign-types'}
                queryKey={QUERIES.CAMPAIGN_TYPES_LIST}
                showView={false}
                showEdit={true}
                title="Delete Campaign Type"
                text={`Are you sure you want to delete the campaign type '${props.data[props.row.index].name}'?`}
            />
        ),
    },
]

export {CampaignTypesColumns}