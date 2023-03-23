import {Column} from 'react-table'
import React from 'react';
import {CustomHeader} from '../../../../../../modules/table/columns/CustomHeader';
import {TextCell} from '../../../../../../modules/table/columns/TextCell';
import {Restricted} from '../../../../../../modules/auth/AuthAccessControl';
import {ActionsCell} from '../../../../../../modules/table/columns/ActionsCell';
import {QUERIES} from '../../../../../../../_metronic/helpers';
import {PublisherPayment} from '../../../../../../models/supply/publisher/PublisherPayment';

const PublisherPaymentsColumns: ReadonlyArray<Column<PublisherPayment>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title="Beneficiary" className="min-w-125px"/>,
        id: 'beneficiary',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].beneficiary}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Account number" className="min-w-125px"/>,
        id: 'account_number',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].account_number}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Swift code" className="min-w-125px"/>,
        id: 'swift_code',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].swift_code}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="IBAN" className="min-w-125px"/>,
        id: 'iban',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].iban}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Bank name" className="min-w-125px"/>,
        id: 'bank_name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].bank_name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title="Bank address" className="min-w-125px"/>,
        id: 'bank_address',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].bank_address}/>,
    },
    {
        Header: (props) => (
            <Restricted to="manage-supply">
                <CustomHeader tableProps={props} title="Actions" className="text-end min-w-100px"/>
            </Restricted>
        ),
        id: 'actions',
        Cell: ({...props}) => (
            <Restricted to={'manage-supply'}>
                <ActionsCell
                    id={props.data[props.row.index].id}
                    path={'supply/publishers/payments'}
                    queryKey={QUERIES.PUBLISHER_PAYMENTS_LIST}
                    showView={false}
                    showEdit={false}
                    showDelete={true}
                    title="Delete Publisher Payment"
                    text={`Are you sure you want to delete the publisher payment of beneficiary '${props.data[props.row.index].beneficiary}'?`}
                />
            </Restricted>
        ),
    },
]

export {PublisherPaymentsColumns}
