import React from 'react'
import {Column} from 'react-table'
import {QUERIES} from '../../../../../../../_metronic/helpers'
import {PublicationVertical} from '../../../../../../models/supply/publication/PublicationVertical'
import {Restricted} from '../../../../../../modules/auth/AuthAccessControl'
import {ActionsCell} from '../../../../../../modules/table/columns/ActionsCell'
import {BadgeCell} from '../../../../../../modules/table/columns/BadgeCell'
import {CustomHeader} from '../../../../../../modules/table/columns/CustomHeader'
import {TextCell} from '../../../../../../modules/table/columns/TextCell'
import {usePublicationEdit} from '../../PublicationEditContext'

const PublicationVerticalsColumns: ReadonlyArray<Column<PublicationVertical>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Vertical' className='min-w-125px' />,
    id: 'vertical',
    Cell: ({...props}) => <TextCell text={props.data[props.row.index].vertical.name} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Is Primary?' className='min-w-125px' />
    ),
    id: 'is-primary',
    Cell: ({...props}) => (
      <BadgeCell
        status={props.data[props.row.index].is_primary ? 'Yes' : 'No'}
        color={props.data[props.row.index].is_primary ? 'light-success' : 'light-danger'}
        align='left'
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
    Cell: ({...props}) => {
      const {publication, handleRefresh} = usePublicationEdit()

      const publicationVerticalSummary = `vertical: ${props.data[props.row.index].vertical.name} 
            and ${props.data[props.row.index].is_primary ? 'it is primary' : 'it is not primary'}`

      return (
        <Restricted to={'manage-supply'}>
          <ActionsCell
            id={props.data[props.row.index].id}
            path={`supply/publications/${publication?.id}/verticals`}
            queryKey={QUERIES.PUBLICATION_VERTICALS_LIST}
            showView={false}
            showEdit={true}
            showDelete={!props.data[props.row.index].is_primary}
            title='Delete Publication Vertical'
            text={`Are you sure you want to delete the publication vertical that includes the following details: '${publicationVerticalSummary}'?`}
            callBackFn={handleRefresh}
          />
        </Restricted>
      )
    },
  },
]

export {PublicationVerticalsColumns}
