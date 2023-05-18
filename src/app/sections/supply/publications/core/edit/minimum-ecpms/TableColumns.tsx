import {Column} from 'react-table'
import React from 'react';
import {CustomHeader} from '../../../../../../modules/table/columns/CustomHeader';
import {TextCell} from '../../../../../../modules/table/columns/TextCell';
import {Restricted} from '../../../../../../modules/auth/AuthAccessControl';
import {ActionsCell} from '../../../../../../modules/table/columns/ActionsCell';
import {QUERIES} from '../../../../../../../_metronic/helpers';
import {PublicationMinimumEcpm} from '../../../../../../models/supply/publication/PublicationMinimumEcpm';
import {usePublication} from '../../PublicationContext';
import {BadgeCell} from '../../../../../../modules/table/columns/BadgeCell';
import {GEO_TYPE} from '../../../../../../enums/Supply/GeoType';

const PublicationMinimumEcpmColumns: ReadonlyArray<Column<PublicationMinimumEcpm>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title="Format" className="min-w-125px"/>,
        id: 'format',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].format?.name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Geo Type" className="min-w-125px"/>,
        id: 'geo_type',
        Cell: ({...props}) => <BadgeCell status={props.data[props.row.index].geoType.name}
                                         color={props.data[props.row.index].geoType.id === GEO_TYPE.REGION ? 'light-primary' : 'light-info'}
                                         align="left"/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Geo" className="min-w-125px"/>,
        id: 'geo',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].geo?.name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Price" className="min-w-125px"/>,
        id: 'price',
        Cell: ({...props}) => <TextCell text={`${props.data[props.row.index].rate} ${props.data[props.row.index].currency.currency}`}/>,
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

            const publicationMinimumEcpmSummary = `format: ${props.data[props.row.index].format.name} | 
            geo type: ${props.data[props.row.index].geoType.name} | 
            geo: ${props.data[props.row.index].geo.name} | 
            rate: ${props.data[props.row.index].rate} ${props.data[props.row.index].currency.currency}`;

            return (
                <Restricted to={'manage-supply'}>
                    <ActionsCell
                        id={props.data[props.row.index].id}
                        path={`supply/publications/${publication?.id}/minimum-ecpms`}
                        queryKey={QUERIES.PUBLICATION_MINIMUM_ECPMS_LIST}
                        showView={false}
                        showEdit={true}
                        showDelete={true}
                        title="Delete Publication Minimum ECPM"
                        text={`Are you sure you want to delete the publication minimum ECPM that includes the following details: '${publicationMinimumEcpmSummary}'?`}
                    />
                </Restricted>
            )
        }
    },
]

export {PublicationMinimumEcpmColumns}
