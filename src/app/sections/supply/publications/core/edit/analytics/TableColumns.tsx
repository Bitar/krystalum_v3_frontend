import {Column} from 'react-table'
import React from 'react';
import {CustomHeader} from '../../../../../../modules/table/columns/CustomHeader';
import {TextCell} from '../../../../../../modules/table/columns/TextCell';
import {Restricted} from '../../../../../../modules/auth/AuthAccessControl';
import {ActionsCell} from '../../../../../../modules/table/columns/ActionsCell';
import {QUERIES} from '../../../../../../../_metronic/helpers';
import {PublicationAnalytic} from '../../../../../../models/supply/publication/PublicationAnalytic';
import {usePublication} from '../../PublicationContext';
import {formatNumberWithSuffix} from '../../../../../../helpers/stringGenerator';

const PublicationAnalyticsColumns: ReadonlyArray<Column<PublicationAnalytic>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title="Value" className="min-w-125px"/>,
        id: 'value',
        Cell: ({...props}) => <TextCell text={formatNumberWithSuffix(props.data[props.row.index].value)}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Device" className="min-w-125px"/>,
        id: 'device',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].device ? props.data[props.row.index].device?.name : '- N/A -'}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Geo Type" className="min-w-125px"/>,
        id: 'geo_type',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].geoType.name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Geo" className="min-w-125px"/>,
        id: 'geo',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].geo?.name}/>,
    },
    {
        Header: (props) => (
            <Restricted to="manage-supply">
                <CustomHeader tableProps={props} title="Actions" className="text-end min-w-100px"/>
            </Restricted>
        ),
        id: 'actions',
        Cell: ({...props}) => {
            const {publication} = usePublication();

            return (
                <Restricted to={'manage-supply'}>
                    <ActionsCell
                        id={props.data[props.row.index].id}
                        path={`supply/publications/${publication?.id}/analytics`}
                        queryKey={QUERIES.PUBLICATION_ANALYTICS_LIST}
                        showView={false}
                        showEdit={true}
                        showDelete={true}
                        title="Delete Publication Analytics"
                        text={`Are you sure you want to delete the publication analytic of TODO '${props.data[props.row.index].value}'?`}
                    />
                </Restricted>
            )
        }
    },
]

export {PublicationAnalyticsColumns}
