import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Protection = ({ children, authentication = true }) => {
    const [loader, setLoader] = useState(true)
    const authstatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
useEffect(()=>{
    if(authentication&&authentication!==authstatus){
        navigate('/login')
    }else if(!authentication&&authentication!==authstatus){
        navigate('/')
    }
    setLoader(false)
},[navigate,authentication,authstatus])

    return (
        loader? <><p>I am not able to verify</p></>:<>{children}</>
    )
}

export default Protection