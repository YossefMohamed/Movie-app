import React from 'react'

function Tag(props) {
  return (
    <span className="inline-flex items-center m-1 px-6 py-2 cursor-pointer bg-primary-dark rounded-full text-lg font-semibold text-text-dark">
      <span className="ml-1">
      {props.name}
      </span>
      </span>
  )
}

export default Tag