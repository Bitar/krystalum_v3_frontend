import {Column} from 'react-table'
import React from 'react';
import {CustomHeader} from '../../../../../../modules/table/columns/CustomHeader';
import {TextCell} from '../../../../../../modules/table/columns/TextCell';
import {Restricted} from '../../../../../../modules/auth/AuthAccessControl';
import {ActionsCell} from '../../../../../../modules/table/columns/ActionsCell';
import {QUERIES} from '../../../../../../../_metronic/helpers';
import {usePublication} from '../../PublicationContext';
import {PublicationAdServer} from '../../../../../../models/supply/publication/PublicationAdServer';

const PublicationAdServersColumns: ReadonlyArray<Column<PublicationAdServer>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title="Ad Server" className="min-w-125px"/>,
        id: 'ad_server',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].adServer?.name}/>,
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
                        path={`supply/publications/${publication?.id}/ad-servers`}
                        queryKey={QUERIES.PUBLICATION_AD_SERVERS_LIST}
                        showView={false}
                        showEdit={true}
                        showDelete={true}
                        title="Delete Publication Ad Servers"
                        text={`Are you sure you want to delete the publication ad server of ad server '${props.data[props.row.index].adServer?.name}'?`}
                    />
                </Restricted>
            )
        }
    },
]

export {PublicationAdServersColumns}
