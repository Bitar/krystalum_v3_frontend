import React from 'react'
import {Column} from 'react-table'
import {QUERIES} from '../../../../../../../_metronic/helpers'
import {PermissionEnum} from '../../../../../../enums/PermissionEnum'
import {RoleEnum} from '../../../../../../enums/RoleEnum'
import {PublisherPayment} from '../../../../../../models/supply/publisher/PublisherPayment'
import {useAuth} from '../../../../../../modules/auth'
import {useAccessControl} from '../../../../../../modules/auth/AuthAccessControl'
import {ActionsCell} from '../../../../../../modules/table/columns/ActionsCell'
import {CustomHeader} from '../../../../../../modules/table/columns/CustomHeader'
import {TextCell} from '../../../../../../modules/table/columns/TextCell'
import {usePublisherEdit} from '../../PublisherEditContext'

const PublisherPaymentsColumns: ReadonlyArray<Column<PublisherPayment>> = [
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Beneficiary' className='min-w-125px' />
    ),
    id: 'beneficiary',
    Cell: ({...props}) => <TextCell text={props.data[props.row.index].beneficiary} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Account number' className='min-w-125px' />
    ),
    id: 'account-number',
    Cell: ({...props}) => <TextCell text={props.data[props.row.index].account_number} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Swift code' className='min-w-125px' />
    ),
    id: 'swift-code',
    Cell: ({...props}) => <TextCell text={props.data[props.row.index].swift_code} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='IBAN' className='min-w-125px' />,
    id: 'iban',
    Cell: ({...props}) => <TextCell text={props.data[props.row.index].iban} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Bank name' className='min-w-125px' />
    ),
    id: 'bank-name',
    Cell: ({...props}) => <TextCell text={props.data[props.row.index].bank_name} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Bank address' className='min-w-125px' />
    ),
    id: 'bank-address',
    Cell: ({...props}) => <TextCell text={props.data[props.row.index].bank_address} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => {
      const {currentUser, hasRoles} = useAuth()
      const accessControl = useAccessControl()
      const {publisher} = usePublisherEdit()

      const publisherPaymentSummary = `beneficiary: ${props.data[props.row.index].beneficiary} | 
            account number: ${props.data[props.row.index].account_number} | 
            swift code: ${props.data[props.row.index].swift_code} | 
            iban: ${props.data[props.row.index].iban} | 
            bank name: ${props.data[props.row.index].bank_name} | 
            bank address: ${props.data[props.row.index].bank_address}`

      return (
        <ActionsCell
          id={props.data[props.row.index].id}
          path={`supply/publishers/${publisher?.id}/payments`}
          queryKey={QUERIES.PUBLISHER_PAYMENTS_LIST}
          showView={false}
          showEdit={
            hasRoles(currentUser, [RoleEnum.PUBLISHER]) ||
            accessControl.userCan(PermissionEnum.MANAGE_SUPPLY)
          }
          showDelete={accessControl.userCan(PermissionEnum.MANAGE_SUPPLY)}
          title='Delete Publisher Payment'
          text={`Are you sure you want to delete the publisher payment that includes the following details: '${publisherPaymentSummary}'?`}
        />
      )
    },
  },
]

export {PublisherPaymentsColumns}
