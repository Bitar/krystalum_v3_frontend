import React from 'react';
import {Table} from 'react-bootstrap';
import {Column, ColumnInstance, Row, useTable} from 'react-table';
import {CustomHeaderColumn} from '../modules/table/columns/CustomHeaderColumn';
import {CustomRow} from '../modules/table/columns/CustomRow';
import {TableListPagination} from '../modules/table/TableListPagination';
import {TableListLoading} from '../modules/table/TableListLoading';

type Props = {
    data: any[],
    columns: readonly Column<any>[],
    model: any,
    isLoading: boolean
}
const KrysTable: React.FC<Props> = ({data, columns, model, isLoading}) => {
    const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
        columns,
        data,
    })

    return (
        <>
            <div className='table-responsive'>
                <Table
                    className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
                    {...getTableProps()}
                >
                    <thead>
                    <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                        {headers.map((column: ColumnInstance<typeof model>) => (
                            <CustomHeaderColumn key={column.id} column={column}/>
                        ))}
                    </tr>
                    </thead>
                    <tbody className='text-gray-600' {...getTableBodyProps()}>
                    {rows.length > 0 ? (
                        rows.map((row: Row<typeof model>, i) => {
                            prepareRow(row)
                            return <CustomRow row={row} key={`row-${i}-${row.id}`}/>
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
                </Table>
            </div>
            <TableListPagination/>
            {isLoading && <TableListLoading/>}
        </>
    );
}

export default KrysTable;