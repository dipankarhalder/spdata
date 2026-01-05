import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import type { MemberTypes } from './types'
import { Edit, Delete } from '@/icons'
import { DataTable } from '@/shared/DataTable'
import { SortHeader } from '@/shared/DataTable/SortHeader'

const getEmployees = (): any[] => {
  const data = localStorage.getItem('employees')
  return data ? JSON.parse(data) : []
}

export const MembersListPage = () => {
  const [sorting, setSorting] = useState<SortingState>([])

  const members: MemberTypes[] = getEmployees()
  const handleEdit = (id: string) => {
    console.log('Edit member:', id)
  }

  const columns = useMemo<ColumnDef<MemberTypes>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
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
      },
      {
        id: 'emp_id',
        header: 'Emp ID',
        cell: ({ row }) => row.original.emp_id,
      },
      {
        id: 'name',
        header: ({ column }) => (
          <SortHeader column={column} title="Member Name" />
        ),
        cell: ({ row }) => {
          const { firstName, lastName } = row.original.basicInfo
          return (
            <Link to={`/members/${row.original.emp_id}`}>
              {firstName} {lastName}
            </Link>
          )
        },
        sortingFn: 'alphanumeric',
      },
      {
        id: 'email',
        header: 'Email',
        cell: ({ row }) => row.original.basicInfo.email,
      },
      {
        id: 'phone',
        header: 'Phone',
        cell: ({ row }) => row.original.basicInfo.mobile,
      },
      {
        accessorKey: 'skills',
        header: 'Skills',
        cell: ({ row }) => row.original.skills.primary,
      },
      {
        accessorKey: 'address',
        header: 'Address',
        cell: ({ row }) => row.original.address.current,
      },
      {
        id: 'actions',
        header: 'Action',
        cell: ({ row }) => (
          <div className="app_table_row_btns">
            <button
              className="app_table_edit_btn"
              onClick={() => handleEdit(row.original.emp_id)}
            >
              <Edit />
            </button>
            <button
              className="app_table_delete_btn"
              onClick={() => console.log('Delete:', row.original.emp_id)}
            >
              <Delete />
            </button>
          </div>
        ),
      },
    ],
    [],
  )

  return (
    <DataTable
      columns={columns}
      data={members}
      sorting={sorting}
      setSorting={setSorting}
      pageSize={10}
    />
  )
}
