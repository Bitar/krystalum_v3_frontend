import React from 'react';
import {Column} from 'react-table'
import {QUERIES} from '../../../../../../../_metronic/helpers';
import {GEO_TYPE} from '../../../../../../enums/Supply/GeoType';
import {PublicationFixedCpm} from '../../../../../../models/supply/publication/PublicationFixedCpm';
import {Restricted} from '../../../../../../modules/auth/AuthAccessControl';
import {ActionsCell} from '../../../../../../modules/table/columns/ActionsCell';
import {BadgeCell} from '../../../../../../modules/table/columns/BadgeCell';
import {CustomHeader} from '../../../../../../modules/table/columns/CustomHeader';
import {TextCell} from '../../../../../../modules/table/columns/TextCell';
import {usePublication} from '../../PublicationContext';

const PublicationFixedCpmColumns: ReadonlyArray<Column<PublicationFixedCpm>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title="Format" className="min-w-125px"/>,
        id: 'format',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].format.name}/>,
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
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].geo.name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Price" className="min-w-125px"/>,
        id: 'price',
        Cell: ({...props}) => <TextCell
            text={`${props.data[props.row.index].price} ${props.data[props.row.index].currency.currency}`}/>,
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

            const publicationFixedCpmSummary = `format: ${props.data[props.row.index].format.name} | 
            geo type: ${props.data[props.row.index].geoType.name} | 
            geo: ${props.data[props.row.index].geo.name} | 
            price: ${props.data[props.row.index].price} ${props.data[props.row.index].currency.currency}`;

            return (
                <Restricted to={'manage-supply'}>
                    <ActionsCell
                        id={props.data[props.row.index].id}
                        path={`supply/publications/${publication?.id}/fixed-cpms`}
                        queryKey={QUERIES.PUBLICATION_FIXED_CPMS_LIST}
                        showView={false}
                        showEdit={true}
                        showDelete={true}
                        title="Delete Publication Fixed CPM"
                        text={`Are you sure you want to delete the publication fixed CPM that includes the following details: '${publicationFixedCpmSummary}'?`}
                    />
                </Restricted>
            )
        }
    },
]

export {PublicationFixedCpmColumns}
