import {Column} from 'react-table'
import React from 'react';

import {QUERIES} from '../../../../../../../_metronic/helpers';

import {CustomHeader} from '../../../../../../modules/table/columns/CustomHeader';
import {TextCell} from '../../../../../../modules/table/columns/TextCell';
import {Restricted} from '../../../../../../modules/auth/AuthAccessControl';
import {ActionsCell} from '../../../../../../modules/table/columns/ActionsCell';
import {PublisherAccountManager} from '../../../../../../models/supply/publisher/PublisherAccountManager';
import {usePublisher} from '../../PublisherContext';
import {formatDateToMonthDayYear} from '../../../../../../helpers/dateFormatter';
import {BadgeCell} from '../../../../../../modules/table/columns/BadgeCell';

const PublisherAccountManagersColumns: ReadonlyArray<Column<PublisherAccountManager>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title="Name" className="min-w-125px"/>,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].user?.name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Email" className="min-w-125px"/>,
        id: 'email',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].user?.email}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Assignment date" className="min-w-125px"/>,
        id: 'assignment_date',
        Cell: ({...props}) => <TextCell
            text={props.data[props.row.index].user ? formatDateToMonthDayYear(props.data[props.row.index].assignment_date) : ''}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Status" className="min-w-125px"/>,
        id: 'status',
        Cell: ({...props}) => <BadgeCell status={props.data[props.row.index].status ? 'Active' : 'Inactive'}
                                         color={props.data[props.row.index].status ? 'light-success' : 'light-danger'}
                                         align="left"/>,
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
                props.data[props.row.index].user ?
                    <Restricted to={'manage-supply'}>
                        <ActionsCell
                            id={props.data[props.row.index].id}
                            path={`supply/publishers/${publisher?.id}/account-managers`}
                            queryKey={QUERIES.PUBLISHER_ACCOUNT_MANAGERS_LIST}
                            showView={false}
                            showEdit={false}
                            showDelete={props.data[props.row.index].status ? true : false}
                            title="Delete Publisher Account Manager"
                            text={`Are you sure you want to delete the publisher account manager '${props.data[props.row.index].user?.name}'?`}
                            callBackFn={() => setRefetchOptions(true)}
                        />
                    </Restricted> : <></>
            )
        },
    },
]

export {PublisherAccountManagersColumns}
