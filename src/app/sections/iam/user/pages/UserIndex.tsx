import {KTCard, KTCardBody, QUERIES} from '../../../../../_metronic/helpers'
import {QueryRequestProvider} from '../../../../modules/table/QueryRequestProvider'
import {
  QueryResponseProvider,
  useQueryResponseData,
  useQueryResponseLoading,
} from '../../../../modules/table/QueryResponseProvider'
import {getUsers} from '../core/UserRequest'
import {ListViewProvider} from '../../../../modules/table/ListViewProvider'
import {useMemo} from 'react'
import {ColumnInstance, Row, useTable} from 'react-table'
import {UserColumns} from '../core/UserColumns'
import {User} from '../models/User'
import {CustomRow} from '../../../../modules/table/columns/CustomRow'
import {CustomHeaderColumn} from '../../../../modules/table/columns/CustomHeaderColumn'
import {TableListPagination} from '../../../../modules/table/TableListPagination'
import {TableListLoading} from '../../../../modules/table/TableListLoading'
import {TableHeader} from '../../../../modules/table/TableHeader'
import {UserFilter} from '../partials/UserFilter'

const UserIndex = () => {
  return (
    <QueryRequestProvider>
      <QueryResponseProvider id={QUERIES.USERS_LIST} requestFunction={getUsers}>
        <ListViewProvider>
          <KTCard>
            <TableHeader name='Role' url='/iam/users' showFilter={true} />
            <KTCardBody>
              <UserFilter />
              <UserTable />
            </KTCardBody>
          </KTCard>
        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  )
}

const UserTable = () => {
  const users = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => users, [users])
  const columns = useMemo(() => UserColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })

  return (
    <>
      <div className='table-responsive'>
        <table
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<User>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<User>, i) => {
                prepareRow(row)
                return <CustomRow row={row} key={`row-${i}-${row.id}`} />
              })
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    No matching records found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <TableListPagination />
      {isLoading && <TableListLoading />}
    </>
  )
}

export default UserIndex
