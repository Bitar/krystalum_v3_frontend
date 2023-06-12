import React from 'react'
import {Column} from 'react-table'
import {QUERIES} from '../../../../../../../_metronic/helpers'
import {Technology} from '../../../../../../models/misc/Technology'
import {Restricted} from '../../../../../../modules/auth/AuthAccessControl'
import {ActionsCell} from '../../../../../../modules/table/columns/ActionsCell'
import {CustomHeader} from '../../../../../../modules/table/columns/CustomHeader'
import {TextCell} from '../../../../../../modules/table/columns/TextCell'
import {usePublicationEdit} from '../../PublicationEditContext'

const PublicationTechnologiesColumns: ReadonlyArray<Column<Technology>> = [
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Technology' className='min-w-125px' />
    ),
    id: 'technology',
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
      const {publication, handleRefresh} = usePublicationEdit()

      return (
        <Restricted to='manage-supply'>
          <ActionsCell
            id={props.data[props.row.index].id}
            path={`supply/publications/${publication?.id}/technologies`}
            queryKey={QUERIES.PUBLICATION_TECHNOLOGIES_LIST}
            showView={false}
            showEdit={false}
            showDelete={true}
            title='Delete Publication Technology'
            text={`Are you sure you want to delete this publication technology that has the technology name '${
              props.data[props.row.index].name
            }'?`}
            callBackFn={handleRefresh}
          />
        </Restricted>
      )
    },
  },
]

export {PublicationTechnologiesColumns}
