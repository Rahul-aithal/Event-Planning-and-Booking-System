import React, { forwardRef, useId } from 'react'

const Input = forwardRef(function Input(
  {
    label,
    id = null,
    type = "text",
    name = null,
    className,
    ...props
  },
  ref
) {
  const randId = useId()
  return (
    <div className="mb-3">
      {label && <label htmlFor={id === null ? randId : id} className={`form-control border-0 bg-transparent fw-bolder`}>{label + ":"}</label>}
      <input type={type} id={id === null ? randId : id} ref={ref} name={name !== null ? name : label.toLowerCase()} className={`form-control ${className}`}
        {...props} />
    </div>
  )
})

export default Input