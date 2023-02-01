import clsx from 'clsx'
import React, {FC} from 'react'
import {Row} from 'react-table'

type Props = {
  row: Row<any>
}

const CustomRow: FC<React.PropsWithChildren<Props>> = ({row}) => (
  <tr {...row.getRowProps()}>
    {row.cells.map((cell) => {
      return (
        <td {...cell.getCellProps()} className={clsx({'text-end': cell.column.id === 'actions'})}>
          {cell.render('Cell')}
        </td>
      )
    })}
  </tr>
)

export {CustomRow}
