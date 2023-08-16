import {useContext} from 'react'
import { UserContext } from '../context/userContext'

export default function Dashboard() {
    const {user} = useContext(UserContext)

    console.log(user?.firstName)
  
    return (
    <div>
      <h1>Dashboard</h1>
      {!!user && (<h2>Hi {user.firstName}</h2>)}
    </div>
  )
}
