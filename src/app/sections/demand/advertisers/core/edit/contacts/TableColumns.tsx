import {Column} from 'react-table'
import React from 'react';
import {CustomHeader} from '../../../../../../modules/table/columns/CustomHeader';
import {TextCell} from '../../../../../../modules/table/columns/TextCell';
import {Restricted} from '../../../../../../modules/auth/AuthAccessControl';
import {ActionsCell} from '../../../../../../modules/table/columns/ActionsCell';
import {QUERIES} from '../../../../../../../_metronic/helpers';
import {AdvertiserContact} from '../../../../../../models/demand/Advertiser';
import {useAdvertiser} from '../../AdvertiserContext';

const AdvertiserContactsColumns: ReadonlyArray<Column<AdvertiserContact>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title="Contact info" className="min-w-125px"/>,
        id: 'contact-info',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].contact_info}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Contact name" className="min-w-125px"/>,
        id: 'contact-name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].contact_name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Agency name" className="min-w-125px"/>,
        id: 'agency-name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].agency_name}/>,
    },
    {
        Header: (props) => (
            <Restricted to="manage-demand">
                <CustomHeader tableProps={props} title="Actions" className="text-end min-w-100px"/>
            </Restricted>
        ),
        id: 'actions',
        Cell: ({...props}) => {

            const {advertiser} = useAdvertiser();

            return (
            <Restricted to={'manage-demand'}>
                <ActionsCell
                    id={props.data[props.row.index].id}
                    path={`demand/advertisers/${advertiser?.id}/contacts`}
                    queryKey={QUERIES.ADVERTISER_CONTACTS_LIST}
                    showView={false}
                    showEdit={true}
                    showDelete={true}
                    title="Delete Advertiser Contact"
                    text={`Are you sure you want to delete the advertiser contact with info '${props.data[props.row.index].contact_info}'?`}
                />
            </Restricted>);
        },
    },
]

export {AdvertiserContactsColumns}