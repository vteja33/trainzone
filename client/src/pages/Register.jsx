import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


  

export default function Register() {
  const navigate = useNavigate()
  const[data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userid: '',
    password: '',
    role: '',
    gender: '',
    info: ''
  })
  

  const registerUser = async (e) => {
    e.preventDefault();
  const { firstName, lastName, email, userid, password, role, gender, info } = data;
  try {
    const { data } = await axios.post('/register', {
      firstName,
      lastName,
      email,
      userid,
      password,
      role,
      gender,
      info
    });
    if (data.error) {
      toast.error(data.error);
    } else {
      setData({});
      toast.success('Registration Successful. Welcome!'); /*Confirms registration entry */
      navigate('/login');
      
    }
  } catch (error) {
    console.log(error);
  }
  };


  
  /*Register page display. Drop down entries with gender, user type 
  and extra entry field appears based off drop down of User or Trainer*/
  return (
    <div className='reg'>
      <form className='auth-form' onSubmit={registerUser}>
        <label className ='reg-label'>First Name</label>
        <input type='text' 
          className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:border-blue-300" 
          placeholder='' 
          value={data.firstName} 
          onChange={(e) => 
          setData({...data, firstName: e.target.value})}/>


        <label className ='label'>Last Name</label>
        <input type='text'
          className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:border-blue-300"
          placeholder='' 
          value={data.lastName} 
          onChange={(e) => 
          setData({...data, lastName: e.target.value})}/>


        <label className ='label'>Email</label>
        <input type='email'  className="mt-0.5 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:border-blue-300" placeholder='' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
        <label className ='label'>Username</label>
        <input type='text'  className="mt-0.5 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:border-blue-300" placeholder='' value={data.userid} onChange={(e) => setData({...data, userid: e.target.value})}/>
        <label className ='label'>Password</label>
        <input type='password' className="mt-0.5 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:border-blue-300" placeholder='' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
        <label className ='label'>Role</label>
        <select
          className="mt-0.5 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:border-blue-300"
          value={data.role}
          onChange={(e) => setData({ ...data, role: e.target.value })}
        >
          <option value=''>Select Role</option>
          <option value='Trainer'>Trainer</option>
          <option value='User'>User</option>
        </select>


        <label className ='label'>Gender</label>
        <select 
          className="mt-0.5 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:border-blue-300"
          value={data.gender}
          onChange={(e) => setData({ ...data, gender: e.target.value })}
        >
          <option value=''>Select Gender</option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
          <option value='Other'>Other</option>
        </select>

        {(data.role === 'Trainer') && (
          <label className ='label'>
            Trainer Info:
            <input
              className="mt-0.5 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:border-blue-300"
              type="text"
              name="Go On, Impress your Clients!"
              value={data.info}
              onChange={(e) => setData({ ...data, info: e.target.value })}
            />
          </label>
        )}

        {(data.role === 'User') && (
          <label>
            User Info:
            <input
              type="text"
              className="mt-0.5 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:border-blue-300"
              name="Tell us About Yourself in 3-5 sentences so we can find Trainers tailored for your goals!"
              value={data.info}
              onChange={(e) => setData({ ...data, info: e.target.value })}
            />
          </label>
        )}

        
  
        <div className="flex justify-center">
          <button type='submit' className="bg-yellow-500 rounded-[0.5rem] py-1.5 px-4 font-bold mt-4 mr-4 center">Register</button>
        </div>
      </form>
    </div>
  )
}
