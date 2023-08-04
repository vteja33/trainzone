import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


  

export default function Register() {
  const navigate = useNavigate()
  const[data, setData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    gender: '',
  })
  

  const registerUser = async (e) => {
    e.preventDefault()
    const {name, email, password, role, gender } = data
    try {
      const {data} = await axios.post('/register', {
        name, email, password, role, gender
      })
      if(data.error) {
        toast.error(data.error)
      }
      else {
        setData({})
        toast.success('Registration Successful. Welcome!')
        navigate('/login')
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  
  
  return (
    <div>
      <form onSubmit={registerUser}>
        <label>Name</label>
        <input type='text' placeholder='enter name...' value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>
        <label>Email</label>
        <input type='email' placeholder='enter email...' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
        <label>Password</label>
        <input type='password' placeholder='enter password...' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
        <label>Role</label>
        <select
          value={data.role}
          onChange={(e) => setData({ ...data, role: e.target.value })}
        >
          <option value=''>Select Role</option>
          <option value='Trainer'>Trainer</option>
          <option value='User'>User</option>
        </select>


        <label>Gender</label>
        <select
          value={data.gender}
          onChange={(e) => setData({ ...data, gender: e.target.value })}
        >
          <option value=''>Select Gender</option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
          <option value='Other'>Other</option>
        </select>
  
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
