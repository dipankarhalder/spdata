import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table'

const data = [{ id: 1, name: 'Dipankar', age: 20, address: 'Kolkata' }]
const columns = [
  { accessorKey: 'name', header: 'Name' },
  {
    accessorKey: 'age',
    header: 'Age',
    accessorFn: (row: { age: any }) => row.age,
  },
  { accessorKey: 'address', header: 'Address' },
]

export const ReportsPage = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(hg => (
          <tr key={hg.id}>
            {hg.headers.map(header => (
              <th key={header.id}>
                {flexRender(
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
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
