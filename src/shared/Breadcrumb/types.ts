export interface BreadcrumbItem {
  label: string
  icon?: React.ReactNode
  to: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
}
