import {Column} from 'react-table'
import React from 'react';
import {CustomHeader} from '../../../../../../modules/table/columns/CustomHeader';
import {TextCell} from '../../../../../../modules/table/columns/TextCell';
import {Restricted} from '../../../../../../modules/auth/AuthAccessControl';
import {ActionsCell} from '../../../../../../modules/table/columns/ActionsCell';
import {QUERIES} from '../../../../../../../_metronic/helpers';
import {usePublication} from '../../PublicationContext';
import {PublicationVertical} from '../../../../../../models/supply/publication/PublicationVertical';

const PublicationVerticalsColumns: ReadonlyArray<Column<PublicationVertical>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title="Vertical" className="min-w-125px"/>,
        id: 'vertical',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].vertical.name}/>,
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
                        path={`supply/publications/${publication?.id}/verticals`}
                        queryKey={QUERIES.PUBLICATION_VERTICALS_LIST}
                        showView={false}
                        showEdit={true}
                        showDelete={true}
                        title="Delete Publication Verticals"
                        text={`Are you sure you want to delete the publication vertical of vertical '${props.data[props.row.index].vertical.name}'?`}
                    />
                </Restricted>
            )
        }
    },
]

export {PublicationVerticalsColumns}
