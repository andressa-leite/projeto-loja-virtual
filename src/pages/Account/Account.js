import React, { useEffect, useState } from 'react'

function Account() {
  const [user, setUser] = useState({
    
      name:'', 
      email: '',
      _id: '',
    }
  )
  useEffect(() => {
    const data = localStorage.getItem('data')
    setUser(JSON.parse(data).user)
    console.log(data)
  },[])
  return (
    <>
    <div>{user.name}</div>
    <div>{user.email}</div>
    <div>{user._id}</div>
    </>
  )
}

export default Account