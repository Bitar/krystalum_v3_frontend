import {Column} from 'react-table'
import React from 'react';
import {CustomHeader} from '../../../../../../modules/table/columns/CustomHeader';
import {TextCell} from '../../../../../../modules/table/columns/TextCell';
import {User} from '../../../../../../models/iam/User';
import {useCampaign} from '../../CampaignContext';

const CampaignOwnershipColumns: ReadonlyArray<Column<User>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title="Name" className="min-w-125px"/>,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Status" className="min-w-125px"/>,
        id: 'status',
        Cell: ({...props}) => {
            const {campaign} = useCampaign();

            let status = 'inactive';

            if(campaign?.owner && campaign?.owner.id === props.data[props.row.index].id && props.row.index === 0) {
                // if the campaign owner is the same as the ownership record user AND it's the latest ownership record
                // then he's the active one
                status = 'active';
            }

            return <TextCell text={status}/>
        },
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Ownership date" className="min-w-125px"/>,
        id: 'ownership-date',
        Cell: ({...props}) => <TextCell text={'TODO'}/>,
    }
]

export {CampaignOwnershipColumns}