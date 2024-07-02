import React, { forwardRef, useId } from 'react'

const Input = forwardRef( function Input(
{
label,

type="text",
name=null,
className,
...props
},
ref
) {
     const id=useId()
  return (
    <div className="mb-3">
    {label && <label htmlFor={id} className={`form-control border-0 bg-transparent fw-bolder`}>{label+":"}</label>}
    <input type={type} id={id} ref={ref} name={name!==null?name:label.toLowerCase()} className={`form-control ${className}`}
    {...props} />
    </div>
  )
})

export default Input