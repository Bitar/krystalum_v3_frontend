import React from 'react'
import {Column} from 'react-table'
import {QUERIES} from '../../../../../_metronic/helpers'
import {Publication} from '../../../../models/supply/publication/Publication'
import {Restricted} from '../../../../modules/auth/AuthAccessControl'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {BadgeCell} from '../../../../modules/table/columns/BadgeCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {TextCell} from '../../../../modules/table/columns/TextCell'

const PublicationsColumns: ReadonlyArray<Column<Publication>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <TextCell text={props.data[props.row.index].name} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Unique Identifier' className='min-w-125px' />
    ),
    id: 'unique-identifier',
    Cell: ({...props}) => (
      <BadgeCell
        status={props.data[props.row.index].unique_identifier}
        color='light-info'
        align='left'
      />
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Type' className='min-w-125px' />,
    id: 'type',
    Cell: ({...props}) => (
      <TextCell
        text={
          props.data[props.row.index].info?.type.id
            ? props.data[props.row.index].info?.type.id.charAt(0).toUpperCase() +
              props.data[props.row.index].info?.type.id.slice(1)
            : 'N/A'
        }
      />
    ),
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Publisher' className='min-w-125px' />
    ),
    id: 'publisher',
    Cell: ({...props}) => <TextCell text={props.data[props.row.index].publisher.name} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='URL' className='min-w-125px' />,
    id: 'url',
    Cell: ({...props}) => (
      <TextCell
        text={props.data[props.row.index].info?.url ? props.data[props.row.index].info?.url : 'N/A'}
      />
    ),
  },
  {
    Header: (props) => (
      <Restricted to='manage-supply'>
        <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
      </Restricted>
    ),
    id: 'actions',
    Cell: ({...props}) => (
      <Restricted to='manage-supply'>
        <ActionsCell
          id={props.data[props.row.index].id}
          path='supply/publications'
          queryKey={QUERIES.PUBLICATIONS_LIST}
          showView={false}
          showEdit={true}
          showDelete={true}
          title='Delete Publication'
          text={`Are you sure you want to delete the publication '${
            props.data[props.row.index].name
          }'?`}
        />
      </Restricted>
    ),
  },
]

export {PublicationsColumns}
