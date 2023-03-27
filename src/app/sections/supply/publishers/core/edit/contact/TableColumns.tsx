import {Column} from 'react-table'
import React from 'react';
import {CustomHeader} from '../../../../../../modules/table/columns/CustomHeader';
import {TextCell} from '../../../../../../modules/table/columns/TextCell';
import {Restricted} from '../../../../../../modules/auth/AuthAccessControl';
import {ActionsCell} from '../../../../../../modules/table/columns/ActionsCell';
import {QUERIES} from '../../../../../../../_metronic/helpers';
import {PublisherContact} from '../../../../../../models/supply/publisher/PublisherContact';
import {usePublisher} from '../../PublisherContext';

const PublisherContactsColumns: ReadonlyArray<Column<PublisherContact>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title="Contact type" className="min-w-125px"/>,
        id: 'type',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].type?.name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Contact detail" className="min-w-125px"/>,
        id: 'detail',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].detail}/>,
    },
    {
        Header: (props) => (
            <Restricted to="manage-supply">
                <CustomHeader tableProps={props} title="Actions" className="text-end min-w-100px"/>
            </Restricted>
        ),
        id: 'actions',
        Cell: ({...props}) => {
            const {publisher, setRefetchOptions} = usePublisher();

            return (
                <Restricted to={'manage-supply'}>
                    <ActionsCell
                        id={props.data[props.row.index].id}
                        path={`supply/publishers/${publisher?.id}/contacts`}
                        queryKey={QUERIES.PUBLISHER_CONTACTS_LIST}
                        showView={false}
                        showEdit={false}
                        showDelete={true}
                        title="Delete Publisher Contact"
                        text={`Are you sure you want to delete the publisher contact '${props.data[props.row.index].type.name}'?`}
                        callBackFn={() => setRefetchOptions(true)}
                    />
                </Restricted>
            )
        }
    },
]

export {PublisherContactsColumns}
