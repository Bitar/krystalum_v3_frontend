import {Column} from 'react-table'
import React from 'react';
import {CustomHeader} from '../../../../../../modules/table/columns/CustomHeader';
import {TextCell} from '../../../../../../modules/table/columns/TextCell';
import {Restricted} from '../../../../../../modules/auth/AuthAccessControl';
import {ActionsCell} from '../../../../../../modules/table/columns/ActionsCell';
import {QUERIES} from '../../../../../../../_metronic/helpers';
import {usePublication} from '../../PublicationContext';
import {PublicationTechnology} from '../../../../../../models/supply/publication/PublicationTechnology';

const PublicationTechnologiesColumns: ReadonlyArray<Column<PublicationTechnology>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title="Technology" className="min-w-125px"/>,
        id: 'technology',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].technology?.name}/>,
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
                        path={`supply/publications/${publication?.id}/technologies`}
                        queryKey={QUERIES.PUBLICATION_TECHNOLOGIES_LIST}
                        showView={false}
                        showEdit={true}
                        showDelete={true}
                        title="Delete Publication Technologies"
                        text={`Are you sure you want to delete the publication technology of technology '${props.data[props.row.index].technology?.name}'?`}
                    />
                </Restricted>
            )
        }
    },
]

export {PublicationTechnologiesColumns}
