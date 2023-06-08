import React, {Dispatch, SetStateAction, useState} from 'react'
import {FilterFields} from '../../core/filterForm'
import PublicationFilter from './Filter'

interface Props {
  showFilter: boolean
  setExportQuery: Dispatch<SetStateAction<string>>
}

const PublicationArchivedFilter: React.FC<Props> = ({showFilter, setExportQuery}) => {
  const [filters, setFilters] = useState<FilterFields>({is_archived: 1})

  return (
    <PublicationFilter
      showFilter={showFilter}
      setExportQuery={setExportQuery}
      filters={filters}
      setFilters={setFilters}
    />
  )
}

export default PublicationArchivedFilter
