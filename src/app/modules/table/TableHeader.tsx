import {TableListToolbar} from './TableListToolbar'
import React, {FC} from 'react'

type Props = {
  name: string
  url?: string
  showAdd?: boolean
  showFilter?: boolean
}

const TableHeader: FC<React.PropsWithChildren<Props>> = ({
  name,
  url,
  showAdd = true,
  showFilter = false,
}) => {
  return (
    <div className='card-header border-0 pt-6'>
      {/*<TableSearchComponent />*/}
      <div className='card-title'></div>
      <div className='card-toolbar'>
        <TableListToolbar name={name} url={url} showAdd={showAdd} showFilter={showFilter} />
      </div>
    </div>
  )
}

export {TableHeader}
