import {Column} from 'react-table'
import React from 'react';
import {CustomHeader} from '../../../../../../modules/table/columns/CustomHeader';
import {TextCell} from '../../../../../../modules/table/columns/TextCell';
import {User} from '../../../../../../models/iam/User';
import {BadgeCell} from '../../../../../../modules/table/columns/BadgeCell';
import {toDateTimeString} from '../../../../../../helpers/stringGenerator';

const CampaignOwnershipColumns: ReadonlyArray<Column<User>> = [
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
        Header: (props) => <CustomHeader tableProps={props} title="Status" className="min-w-125px"/>,
        id: 'status',
        Cell: ({...props}) => <BadgeCell status={props.data[props.row.index].is_active === 1 ? 'Active' : 'Inactive'} color={props.data[props.row.index].is_active === 1 ? 'success' : 'secondary'}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Ownership date" className="min-w-125px"/>,
        id: 'ownership-date',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].assignment_date}/>,
    }
]

export {CampaignOwnershipColumns}