import React, { createContext, useState } from 'react'

export const ContextApi = createContext()

const ContextProvider = ({children}) => {

    const [data, setData] = useState([])
    const [position,setPosition] = useState({x:0,y:0})

    return (
        <ContextApi.Provider value={{ data, setData,position,setPosition }}>{children}</ContextApi.Provider>
    )
}

export default ContextProvider