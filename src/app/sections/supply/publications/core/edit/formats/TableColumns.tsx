import {Column} from 'react-table'
import React from 'react';
import {CustomHeader} from '../../../../../../modules/table/columns/CustomHeader';
import {TextCell} from '../../../../../../modules/table/columns/TextCell';
import {Restricted} from '../../../../../../modules/auth/AuthAccessControl';
import {ActionsCell} from '../../../../../../modules/table/columns/ActionsCell';
import {QUERIES} from '../../../../../../../_metronic/helpers';
import {usePublication} from '../../PublicationContext';
import {PublicationFormat} from '../../../../../../models/supply/publication/PublicationFormat';

const PublicationFormatsColumns: ReadonlyArray<Column<PublicationFormat>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title="Format" className="min-w-125px"/>,
        id: 'format',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].format.name}/>,
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
                        path={`supply/publications/${publication?.id}/formats`}
                        queryKey={QUERIES.PUBLICATION_FORMATS_LIST}
                        showView={false}
                        showEdit={true}
                        showDelete={true}
                        title="Delete Publication Formats"
                        text={`Are you sure you want to delete the publication format of format '${props.data[props.row.index].format.name}'?`}
                    />
                </Restricted>
            )
        }
    },
]

export {PublicationFormatsColumns}
