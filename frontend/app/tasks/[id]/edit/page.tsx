import React from 'react'

const EditTask = ({params: {id}}: {params: {id: string}}) => {
  return (
    <div>EditTask for - {id}</div>
  )
}

export default EditTask