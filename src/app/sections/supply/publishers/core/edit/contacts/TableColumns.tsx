import React from 'react'
import {Column} from 'react-table'
import {QUERIES} from '../../../../../../../_metronic/helpers'
import {PublisherContact} from '../../../../../../models/supply/publisher/PublisherContact'
import {Restricted} from '../../../../../../modules/auth/AuthAccessControl'
import {ActionsCell} from '../../../../../../modules/table/columns/ActionsCell'
import {CustomHeader} from '../../../../../../modules/table/columns/CustomHeader'
import {TextCell} from '../../../../../../modules/table/columns/TextCell'
import {useSupply} from '../../../../shared/SupplyContext'

const PublisherContactsColumns: ReadonlyArray<Column<PublisherContact>> = [
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Contact type' className='min-w-125px' />
    ),
    id: 'type',
    Cell: ({...props}) => <TextCell text={props.data[props.row.index].contactType.name} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Contact detail' className='min-w-125px' />
    ),
    id: 'detail',
    Cell: ({...props}) => <TextCell text={props.data[props.row.index].detail} />,
  },
  {
    Header: (props) => (
      <Restricted to='manage-supply'>
        <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
      </Restricted>
    ),
    id: 'actions',
    Cell: ({...props}) => {
      const {publisher} = useSupply()

      const publisherContactSummary = `type: ${props.data[props.row.index].contactType.name} | 
            detail: ${props.data[props.row.index].detail}`

      return (
        <Restricted to='manage-supply'>
          <ActionsCell
            id={props.data[props.row.index].id}
            path={`supply/publishers/${publisher?.id}/contacts`}
            queryKey={QUERIES.PUBLISHER_CONTACTS_LIST}
            showView={false}
            showEdit={true}
            showDelete={true}
            title='Delete Publisher Contact'
            text={`Are you sure you want to delete the publisher contact that includes the following details: '${publisherContactSummary}'?`}
          />
        </Restricted>
      )
    },
  },
]

export {PublisherContactsColumns}
