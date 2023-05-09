import {Column} from 'react-table'

import {TextCell} from '../../../../modules/table/columns/TextCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {QUERIES} from '../../../../../_metronic/helpers'
import {Publisher} from '../../../../models/supply/publisher/Publisher';
import {Restricted} from '../../../../modules/auth/AuthAccessControl';
import {Publication} from '../../../../models/supply/publication/Publication';
import {truncateText} from '../../../../helpers/stringGenerator';

const PublishersColumns: ReadonlyArray<Column<Publisher>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title="Name" className="min-w-125px"/>,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Tier" className="min-w-125px"/>,
        id: 'tier',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].tier?.name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Publications" className="min-w-125px"/>,
        id: 'publications',
        Cell: ({...props}) => <TextCell text={truncateText(props.data[props.row.index].publications?.map((publication: Publication) => publication.name).join(', '))} />,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Account Manager" className="min-w-125px"/>,
        id: 'accountManager',
        Cell: ({...props}) => <TextCell
            text={(props.data[props.row.index].accountManager ? props.data[props.row.index].accountManager?.name : '-')}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Country" className="min-w-125px"/>,
        id: 'country',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].info?.hq_country?.name}/>,
    },
    {
        Header: (props) => (
            <Restricted to="manage-supply">
                <CustomHeader tableProps={props} title="Actions" className="text-end min-w-100px"/>
            </Restricted>
        ),
        id: 'actions',
        Cell: ({...props}) => (
            <Restricted to={'manage-supply'}>
                <ActionsCell
                    id={props.data[props.row.index].id}
                    path={'supply/publishers'}
                    queryKey={QUERIES.PUBLISHERS_LIST}
                    showView={false}
                    showEdit={true}
                    showDelete={true}
                    title="Delete Publisher"
                    text={`Are you sure you want to delete the publisher '${props.data[props.row.index].name}'?`}
                />
            </Restricted>
        ),
    },
]

export {PublishersColumns}