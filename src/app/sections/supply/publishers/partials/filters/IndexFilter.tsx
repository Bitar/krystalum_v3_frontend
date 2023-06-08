import React, {Dispatch, SetStateAction, useState} from 'react'
import {FilterFields} from '../../core/filterForm'
import PublisherFilter from './Filter'

interface Props {
  showFilter: boolean
  setExportQuery: Dispatch<SetStateAction<string>>
}

const PublisherIndexFilter: React.FC<Props> = ({showFilter, setExportQuery}) => {
  const [filters, setFilters] = useState<FilterFields>({is_archived: 0})

  return (
    <PublisherFilter
      showFilter={showFilter}
      setExportQuery={setExportQuery}
      filters={filters}
      setFilters={setFilters}
    />
  )
}

export default PublisherIndexFilter
