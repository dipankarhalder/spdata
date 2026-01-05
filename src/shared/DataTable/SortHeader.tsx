import { Uarrow, Darrow } from '@/icons'

export const SortHeader = ({ column, title }: any) => {
  const isSorted = column.getIsSorted()

  return (
    <div className="app_sort_header" onClick={column.getToggleSortingHandler()}>
      {title}
      {isSorted === 'asc' && <Uarrow />}
      {isSorted === 'desc' && <Darrow />}
      {isSorted === false && <Uarrow />}
    </div>
  )
}
