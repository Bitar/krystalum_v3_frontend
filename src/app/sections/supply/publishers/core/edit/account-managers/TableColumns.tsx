import React from 'react';
import {Column} from 'react-table'
import {toDateTimeString} from '../../../../../../helpers/stringGenerator';
import {PublisherAccountManager} from '../../../../../../models/supply/publisher/PublisherAccountManager';
import {BadgeCell} from '../../../../../../modules/table/columns/BadgeCell';
import {CustomHeader} from '../../../../../../modules/table/columns/CustomHeader';
import {TextCell} from '../../../../../../modules/table/columns/TextCell';

const PublisherAccountManagersColumns: ReadonlyArray<Column<PublisherAccountManager>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title="Name" className="min-w-125px"/>,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Email" className="min-w-125px"/>,
        id: 'email',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].email}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Assignment date" className="min-w-125px"/>,
        id: 'assignment-date',
        Cell: ({...props}) => <TextCell
            text={props.data[props.row.index].assignment_date ? toDateTimeString(new Date(props.data[props.row.index].assignment_date)) : ''}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Status" className="min-w-125px"/>,
        id: 'status',
        Cell: ({...props}) => <BadgeCell status={props.data[props.row.index].is_active ? 'Active' : 'Inactive'}
                                         color={props.data[props.row.index].is_active ? 'light-success' : 'light-danger'}
                                         align="left"/>,
    }
]

export {PublisherAccountManagersColumns}
