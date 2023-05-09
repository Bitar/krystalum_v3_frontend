import {Column} from 'react-table'
import React from 'react';
import {CustomHeader} from '../../../../../../modules/table/columns/CustomHeader';
import {TextCell} from '../../../../../../modules/table/columns/TextCell';
import {Restricted} from '../../../../../../modules/auth/AuthAccessControl';
import {ActionsCell} from '../../../../../../modules/table/columns/ActionsCell';
import {QUERIES} from '../../../../../../../_metronic/helpers';
import {usePublication} from '../../PublicationContext';
import {PublicationAdTechnology} from '../../../../../../models/supply/publication/PublicationAdTechnology';

const PublicationAdTechnologiesColumns: ReadonlyArray<Column<PublicationAdTechnology>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title="Technology" className="min-w-125px"/>,
        id: 'technology',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].technology}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Type" className="min-w-125px"/>,
        id: 'type',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].type}/>,
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
                        path={`supply/publications/${publication?.id}/ad-technologies`}
                        queryKey={QUERIES.PUBLICATION_AD_TECHNOLOGIES_LIST}
                        showView={false}
                        showEdit={false}
                        showDelete={false}
                        title="Delete Publication Ad Technologies"
                        text={`Are you sure you want to delete the publication ad technology of technology '${props.data[props.row.index].technology}'?`}
                    />
                </Restricted>
            )
        }
    },
]

export {PublicationAdTechnologiesColumns}
