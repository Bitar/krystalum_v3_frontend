import React from 'react'
import {Column} from 'react-table'
import {QUERIES} from '../../../../../../../_metronic/helpers'
import {PublicationFormat} from '../../../../../../models/supply/publication/PublicationFormat'
import {Restricted} from '../../../../../../modules/auth/AuthAccessControl'
import {ActionsCell} from '../../../../../../modules/table/columns/ActionsCell'
import {BadgeCell} from '../../../../../../modules/table/columns/BadgeCell'
import {CustomHeader} from '../../../../../../modules/table/columns/CustomHeader'
import {TextCell} from '../../../../../../modules/table/columns/TextCell'
import {TextCellWithHelper} from '../../../../../../modules/table/columns/TextCellWithHelper'
import {usePublicationEdit} from '../../PublicationEditContext'

const PublicationFormatsColumns: ReadonlyArray<Column<PublicationFormat>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Format' className='min-w-125px' />,
    id: 'format',
    Cell: ({...props}) => {
      if (props.data[props.row.index].format.parent) {
        return (
          <TextCellWithHelper
            text={props.data[props.row.index].format.parent.name}
            helperText={props.data[props.row.index].format.name}
          />
        )
      } else {
        return <TextCell text={props.data[props.row.index].format.name} />
      }
    },
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Type' className='min-w-125px' />,
    id: 'type',
    Cell: ({...props}) => (
      <BadgeCell
        status={props.data[props.row.index].type.name}
        color={
          props.data[props.row.index].type.id === 'available' ? 'light-success' : 'light-danger'
        }
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
      const {publication} = usePublicationEdit()

      return (
        <Restricted to={'manage-supply'}>
          <ActionsCell
            id={props.data[props.row.index].id}
            path={`supply/publications/${publication?.id}/formats`}
            queryKey={QUERIES.PUBLICATION_FORMATS_LIST}
            showView={false}
            showEdit={true}
            showDelete={true}
            title='Delete Publication Formats'
            text={`Are you sure you want to delete the publication format of format '${
              props.data[props.row.index].format.name
            }'?`}
          />
        </Restricted>
      )
    },
  },
]

export {PublicationFormatsColumns}
