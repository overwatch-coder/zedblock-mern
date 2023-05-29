import React from 'react'

const TaskDetails = ({params: {id}}: {params: {id: string}}) => {
  return (
    <div>TaskDetails - {id}</div>
  )
}

export default TaskDetails