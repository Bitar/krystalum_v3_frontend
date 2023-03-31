import {Column} from 'react-table'
import React from 'react';

import {CustomHeader} from '../../../../../../modules/table/columns/CustomHeader';
import {TextCell} from '../../../../../../modules/table/columns/TextCell';
import {PublisherAccountManager} from '../../../../../../models/supply/publisher/PublisherAccountManager';
import {formatDateToMonthDayYear} from '../../../../../../helpers/dateFormatter';
import {BadgeCell} from '../../../../../../modules/table/columns/BadgeCell';

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
        id: 'assignment_date',
        Cell: ({...props}) => <TextCell
            text={props.data[props.row.index].assignment_date ? formatDateToMonthDayYear(props.data[props.row.index].assignment_date) : ''}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Status" className="min-w-125px"/>,
        id: 'status',
        Cell: ({...props}) => <BadgeCell status={props.data[props.row.index].status ? 'Active' : 'Inactive'}
                                         color={props.data[props.row.index].status ? 'light-success' : 'light-danger'}
                                         align="left"/>,
    }
]

export {PublisherAccountManagersColumns}
