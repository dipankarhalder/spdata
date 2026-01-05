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

export const SalaryListPage = () => {
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
        id: 'basic',
        header: 'Basic',
        cell: ({ row }) => <p>Rs. {row.original.salary.basic}/-</p>,
      },
      {
        id: 'allowances',
        header: 'Allowances',
        cell: ({ row }) => <p>Rs. {row.original.salary.allowances}/-</p>,
      },
      {
        id: 'hra',
        header: 'HRA',
        cell: ({ row }) => <p>Rs. {row.original.salary.hra}/-</p>,
      },
      {
        id: 'deductions',
        header: 'Provident Fund',
        cell: ({ row }) => <p>Rs. {row.original.salary.deductions}/-</p>,
      },
      {
        id: 'netSalary',
        header: 'Net Salary',
        cell: ({ row }) => <p>Rs. {row.original.salary.netSalary}/-</p>,
      },
      {
        id: 'lastMonth',
        header: 'Last Payslip',
        cell: () => {
          return <Link to={'/'}>Dec - 2025</Link>
        },
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
