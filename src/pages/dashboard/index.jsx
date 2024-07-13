import React from 'react'
import { Button } from '../../components'
import { useDispatch } from 'react-redux'
import { setAccessToken } from '../../slice/signup'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(setAccessToken(""))
    navigate('/prototype/signin')

  }
  return (
    <div>Dashboard

      <Button onClick={handleLogout}>Log out</Button>
    </div>
  )
}

export default Dashboard