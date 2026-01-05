import type { ColumnDef, SortingState } from '@tanstack/react-table'

export interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[]
  sorting: SortingState
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>
  pageSize: number
}
