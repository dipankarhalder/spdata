/** node modules */
import { useState, useMemo } from 'react'
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table'

/** types */
import type { ColumnFiltersState } from '@tanstack/react-table'
import type { DataTableProps } from './types'

/** icons */
import { Rarrow, Larrow, Search } from '@/icons'

export const DataTable = <T,>({
  columns,
  data,
  sorting,
  setSorting,
  pageSize,
}: DataTableProps<T>) => {
  /** states */
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})

  /** table config */
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
  })

  const pageSizeOptions = useMemo(() => {
    const totalRows = data.length
    const STEP = 10
    if (totalRows === 0) return []
    const options = []
    for (let i = STEP; i <= totalRows + STEP; i += STEP) {
      options.push(i)
      if (i >= totalRows) break
    }
    return options
  }, [data.length])

  return (
    <div className="app_data_table_cover">
      <div className="app_heading_info">
        <div className="app_header_search">
          <Search />
          <input
            placeholder="Search here..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={e =>
              table.getColumn('name')?.setFilterValue(e.target.value)
            }
          />
        </div>
        <div className="app_top_btn_grp"></div>
      </div>
      <div className="app_data_table_inside">
        <div className="app_data_table_main_cover">
          <table>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="app_table_footer_bottom">
          <div className="app_table_footer_left_side">
            <div className="app_table_data_count">
              <p>
                <span>{table.getFilteredSelectedRowModel().rows.length}</span>{' '}
                of <span>{table.getFilteredRowModel().rows.length} row(s)</span>{' '}
                selected.
              </p>
            </div>
            <div className="app_footer_spcl_info">
              <div className="app_got_page">
                <p>Go to page</p>
                <input
                  type="number"
                  min={1}
                  max={table.getPageCount()}
                  defaultValue={table.getState().pagination.pageIndex + 1}
                  onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                    table.setPageIndex(page)
                  }}
                />
              </div>
              <div className="app_select_table_rec">
                <p>
                  Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
                  {table.getRowCount().toLocaleString()} Rows
                </p>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={e => table.setPageSize(Number(e.target.value))}
                >
                  {pageSizeOptions.map(size => (
                    <option key={size} value={size}>
                      Show {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="app_footer_btn_group">
            <div className="app_footer_pages_counters">
              <p>
                Page {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
              </p>
            </div>
            <div className="app_pagination_btn_cover">
              <button
                className="app_pagination_btn"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <Larrow />
              </button>
              <button
                className="app_pagination_btn"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <Larrow />
              </button>
              <button
                className="app_pagination_btn"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <Rarrow />
              </button>
              <button
                className="app_pagination_btn"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <Rarrow />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
