import React from 'react'

const Button = (
{
  children,
    type="button",
    btnBgtype="btn-primary",
    classNames="",
    ...props
}

) => {
  return (
   <button type={type} className={`btn ${btnBgtype} w-100 ${classNames}`} {...props}>{children} </button>
  )
}

export default Button