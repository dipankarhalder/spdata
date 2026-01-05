import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { Edit, Delete } from '@/icons'
import { DataTable } from '@/shared/DataTable'
import { SortHeader } from '@/shared/DataTable/SortHeader'

const getEmployees = (): any[] => {
  const data = localStorage.getItem('employees')
  return data ? JSON.parse(data) : []
}

export const AttendanceListPage = () => {
  const [sorting, setSorting] = useState<SortingState>([])

  const members: any[] = getEmployees()
  const handleEdit = (id: string) => {
    console.log('Edit member:', id)
  }

  const columns = useMemo<ColumnDef<any>[]>(
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
        id: 'novworkingDays',
        header: 'Nov (WD)',
        cell: ({ row }) => (
          <p>{row.original.attendance.november.totalWorkingDays} Days</p>
        ),
      },
      {
        id: 'novPresent',
        header: 'Nov 2025 (Present)',
        cell: ({ row }) => (
          <>
            <p>
              {row.original.attendance.november.present} days (P) -{' '}
              <span style={{ fontSize: '12px', color: '#a4a4a4' }}>
                {row.original.attendance.november.leaves} days (A)
              </span>
            </p>
          </>
        ),
      },
      {
        id: 'decworkingDays',
        header: 'Dec (WD)',
        cell: ({ row }) => (
          <p>{row.original.attendance.december.totalWorkingDays} Days</p>
        ),
      },
      {
        id: 'decPresent',
        header: 'Dec 2025 (Present)',
        cell: ({ row }) => (
          <>
            <p>
              {row.original.attendance.december.present} days (P) -{' '}
              <span style={{ fontSize: '12px', color: '#a4a4a4' }}>
                {row.original.attendance.december.leaves} days (A)
              </span>
            </p>
          </>
        ),
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
