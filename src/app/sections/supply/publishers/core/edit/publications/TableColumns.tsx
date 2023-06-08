import React from 'react'
import {Column} from 'react-table'
import {QUERIES} from '../../../../../../../_metronic/helpers'
import {Publication} from '../../../../../../models/supply/publication/Publication'
import {Restricted} from '../../../../../../modules/auth/AuthAccessControl'
import {ActionsCell} from '../../../../../../modules/table/columns/ActionsCell'
import {CustomHeader} from '../../../../../../modules/table/columns/CustomHeader'
import {TextCell} from '../../../../../../modules/table/columns/TextCell'

const PublisherPublicationsColumns: ReadonlyArray<Column<Publication>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <TextCell text={props.data[props.row.index].name} />,
  },
  {
    Header: (props) => (
      <Restricted to='manage-supply'>
        <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
      </Restricted>
    ),
    id: 'actions',
    Cell: ({...props}) => {
      return (
        <Restricted to={'manage-supply'}>
          <ActionsCell
            id={props.data[props.row.index].id}
            path={`supply/publications`}
            queryKey={QUERIES.PUBLISHER_PUBLICATIONS_LIST}
            showView={false}
            showEdit={true}
            showDelete={false}
          />
        </Restricted>
      )
    },
  },
]

export {PublisherPublicationsColumns}
