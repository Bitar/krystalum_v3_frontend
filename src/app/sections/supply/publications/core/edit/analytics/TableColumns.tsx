import React from 'react';
import {Column} from 'react-table'
import {QUERIES} from '../../../../../../../_metronic/helpers';
import {ANALYTIC_TYPE} from '../../../../../../enums/Supply/AnalyticType';
import {GEO_TYPE} from '../../../../../../enums/Supply/GeoType';
import {formatNumberWithSuffix} from '../../../../../../helpers/stringGenerator';
import {PublicationAnalytic} from '../../../../../../models/supply/publication/PublicationAnalytic';
import {Restricted} from '../../../../../../modules/auth/AuthAccessControl';
import {ActionsCell} from '../../../../../../modules/table/columns/ActionsCell';
import {BadgeCell} from '../../../../../../modules/table/columns/BadgeCell';
import {CustomHeader} from '../../../../../../modules/table/columns/CustomHeader';
import {TextCell} from '../../../../../../modules/table/columns/TextCell';
import {usePublication} from '../../PublicationContext';

const PublicationAnalyticsColumns: ReadonlyArray<Column<PublicationAnalytic>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title="Geo Type" className="min-w-125px"/>,
        id: 'geo-type',
        Cell: ({...props}) => <BadgeCell status={props.data[props.row.index].geoType.name}
                                         color={props.data[props.row.index].geoType.id === GEO_TYPE.REGION ? 'light-primary' : 'light-info'}
                                         align="left"/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Geo" className="min-w-125px"/>,
        id: 'geo',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].geo.name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Device" className="min-w-125px"/>,
        id: 'device',
        Cell: ({...props}) => <TextCell
            text={props.data[props.row.index].device ? props.data[props.row.index].device?.name : '- N/A -'}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Value" className="min-w-125px"/>,
        id: 'value',
        Cell: ({...props}) => <TextCell text={
            props.data[props.row.index].type.id === ANALYTIC_TYPE.UNIQUE_USERS ||
            props.data[props.row.index].type.id === ANALYTIC_TYPE.PAGE_VIEWS ?
                formatNumberWithSuffix(props.data[props.row.index].value) : props.data[props.row.index].value
        }/>,
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

            const publicationAnalyticSummary = `type: ${props.data[props.row.index].type.name} | 
            geo type: ${props.data[props.row.index].geoType.name} | 
            geo: ${props.data[props.row.index].geo.name} | 
            device: ${props.data[props.row.index].device ? props.data[props.row.index].device.name : 'N/A'} | 
            value: ${props.data[props.row.index].type.id === ANALYTIC_TYPE.UNIQUE_USERS ||
            props.data[props.row.index].type.id === ANALYTIC_TYPE.PAGE_VIEWS ?
                formatNumberWithSuffix(props.data[props.row.index].value) : props.data[props.row.index].value}`;

            return (
                <Restricted to={'manage-supply'}>
                    <ActionsCell
                        id={props.data[props.row.index].id}
                        path={`supply/publications/${publication?.id}/analytics`}
                        queryKey={QUERIES.PUBLICATION_ANALYTICS_LIST}
                        showView={false}
                        showEdit={true}
                        showDelete={true}
                        title="Delete Publication Analytic"
                        text={`Are you sure you want to delete the publication analytic that includes the following details: '${publicationAnalyticSummary}'?`}
                    />
                </Restricted>
            )
        }
    },
]

export {PublicationAnalyticsColumns}
