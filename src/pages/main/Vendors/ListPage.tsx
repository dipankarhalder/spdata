import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import type { VendorTypes } from './types'
import { Edit, Delete } from '@/icons'
import { DataTable } from '@/shared/DataTable'
import { SortHeader } from '@/shared/DataTable/SortHeader'
import vendorData from '@/data/vendors.json'

export const VendorListPage = () => {
  const [sorting, setSorting] = useState<SortingState>([])

  const handleEdit = (id: string) => {
    console.log(id)
  }

  const columns = useMemo<ColumnDef<VendorTypes>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            id="select-row"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'name',
        enableSorting: true,
        enableSortingRemoval: true,
        header: ({ column }) => (
          <SortHeader column={column} title="Vendor Name" />
        ),
        cell: ({ row }) => {
          const vendor = row.original
          return <Link to={`/vendors/${vendor.id}`}>{vendor.name}</Link>
        },
      },
      {
        accessorKey: 'contactPerson',
        header: ({ column }) => (
          <SortHeader column={column} title="Contact Person" />
        ),
      },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'phone', header: 'Phone' },
      {
        accessorKey: 'category',
        header: ({ column }) => (
          <SortHeader column={column} title="Categories" />
        ),
      },
      {
        accessorKey: 'status',
        header: ({ column }) => <SortHeader column={column} title="Status" />,
        cell: ({ row }) => {
          return (
            <p>
              {row.original.status === 'active' ? (
                <span className="active-item">Active</span>
              ) : (
                <span className="inactive-item">Inactive</span>
              )}
            </p>
          )
        },
      },
      {
        accessorKey: 'actions',
        header: 'Action',
        cell: ({ row }) => {
          return (
            <div className="app_table_row_btns">
              <button
                className="app_table_edit_btn"
                onClick={() => handleEdit(row.original.id ?? '')}
              >
                <Edit />
              </button>
              <button
                className="app_table_delete_btn"
                onClick={() => handleEdit(row.original.id ?? '')}
              >
                <Delete />
              </button>
            </div>
          )
        },
      },
    ],
    [sorting],
  )

  return (
    <DataTable
      columns={columns}
      data={vendorData.vendors}
      sorting={sorting}
      setSorting={setSorting}
      pageSize={10}
    />
  )
}
