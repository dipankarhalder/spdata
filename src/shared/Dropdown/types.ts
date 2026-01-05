export interface DropdownItem {
  id: string
  label: string
  icon?: React.ReactNode
  group?: string
}

export interface DropdownGroup {
  group: string
  items: DropdownItem[]
}
