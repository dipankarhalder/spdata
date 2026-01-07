interface DataCardProps<T> {
  data: T
  fields: { [key: string]: string }
  actions: {
    onEdit: (data: T) => void
    onDelete: (data: T) => void
    onToggleStatus: (data: T, status: string) => void
  }
}

const DataCard = <T extends { id: number }>({
  data,
  fields,
  actions,
}: DataCardProps<T>) => {
  // Render the fields dynamically
  return (
    <div
      className="card"
      style={{ padding: '10px', border: '1px solid #ddd', margin: '10px' }}
    >
      <div className="card-content">
        {Object.keys(fields).map(key => (
          <p key={key}>
            <strong>{fields[key]}:</strong> {data[key as keyof T]}
          </p>
        ))}
      </div>
      <div className="actions">
        <button onClick={() => actions.onEdit(data)}>Edit</button>
        <button onClick={() => actions.onDelete(data)}>Delete</button>
        <button
          onClick={() =>
            actions.onToggleStatus(
              data,
              data['status'] === 'active' ? 'inactive' : 'active',
            )
          }
        >
          {data['status'] === 'active' ? 'Deactivate' : 'Activate'}
        </button>
      </div>
    </div>
  )
}

export default DataCard
