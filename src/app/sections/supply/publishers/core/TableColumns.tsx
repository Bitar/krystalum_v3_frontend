import React from 'react';
import {Column} from 'react-table'
import {QUERIES} from '../../../../../_metronic/helpers'
import {PermissionEnum} from '../../../../enums/PermissionEnum';
import {RoleEnum} from '../../../../enums/RoleEnum';
import {truncateText} from '../../../../helpers/stringGenerator';
import {Publication} from '../../../../models/supply/publication/Publication';
import {Publisher} from '../../../../models/supply/publisher/Publisher';
import {useAuth} from '../../../../modules/auth';
import {Restricted, useAccessControl} from '../../../../modules/auth/AuthAccessControl';
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {BadgesCell} from '../../../../modules/table/columns/BadgesCell';
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {TextCell} from '../../../../modules/table/columns/TextCell'

const PublishersColumns: ReadonlyArray<Column<Publisher>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title="Name" className="min-w-125px"/>,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Tier" className="min-w-125px"/>,
        id: 'tier',
        Cell: ({...props}) => props.data[props.row.index].tier ?
            <BadgesCell texts={[props.data[props.row.index].tier?.name]} color="light-info"
                        align="left"/> : <BadgesCell texts={['N/A']} color="light-secondary"
                                                     align="left"/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Publications" className="min-w-125px"/>,
        id: 'publications',
        Cell: ({...props}) => <TextCell
            text={props.data[props.row.index].publications?.length > 0 ? truncateText(props.data[props.row.index].publications?.map((publication: Publication) => publication.name).join(', '))
                : 'N/A'}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Account Manager" className="min-w-125px"/>,
        id: 'account-manager',
        Cell: ({...props}) => <TextCell
            text={(props.data[props.row.index].accountManager ? props.data[props.row.index].accountManager?.name : 'N/A')}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Country" className="min-w-125px"/>,
        id: 'country',
        Cell: ({...props}) => <TextCell
            text={props.data[props.row.index].info?.hq_country ? props.data[props.row.index].info?.hq_country?.name : 'N/A'}/>,
    },
    {
        Header: (props) => (
            <Restricted to="manage-supply">
                <CustomHeader tableProps={props} title="Actions" className="text-end min-w-100px"/>
            </Restricted>
        ),
        id: 'actions',
        Cell: ({...props}) => {
            const {currentUser, hasRoles} = useAuth();
            const accessControl = useAccessControl();

            return (
                <ActionsCell
                    id={props.data[props.row.index].id}
                    path={'supply/publishers'}
                    queryKey={QUERIES.PUBLISHERS_LIST}
                    showView={false}
                    showEdit={(hasRoles(currentUser, [RoleEnum.PUBLISHER]) || accessControl.userCan(PermissionEnum.MANAGE_SUPPLY))}
                    showDelete={accessControl.userCan(PermissionEnum.MANAGE_SUPPLY)}
                    title="Delete Publisher"
                    text={`Are you sure you want to delete the publisher '${props.data[props.row.index].name}'?`}
                />
            )
        }
    },
]

export {PublishersColumns}
