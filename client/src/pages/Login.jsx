import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate()

  const [data, setData] = useState({
    email: '',
    password: '',
  }) /* Sets use state of email and password strings */
  
  const loginUser = async (e) => {
    e.preventDefault()
    const {email, password} = data
    try {
      const {data} = await axios.post('/login', {
        email,
        password,
      })
      if(data.error) {
        toast.error(data.error)
      }
      else {
        setData({})
        toast.success('Login Successful. Welcome!') /* Login confirmation*/

        navigate('/dashboard')
      }
    } catch (error) {
      
    }
  }

/* Login Page Display with placeholder texts in entry boxes*/
  return (
    <div className='log'>
      <form className='auth-form' onSubmit={loginUser}>
        <label className ='auth-form label'>Email</label>
        <input type='email'  className=" p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:border-blue-300" placeholder='' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
        <label className='auth-form label'>Password</label>
        <input type='password' className=" p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:border-blue-300"
         value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
        <div className="flex justify-center">
          <button type='submit' className="bg-yellow-500 rounded-[0.5rem] py-1.5 px-4 font-bold mt-4 mr-4 center">Login</button>
        </div>
      </form>
    </div>
  )
}
