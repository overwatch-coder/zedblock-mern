'use client'

import Link from 'next/link'
import React, {useState, useContext, useEffect} from 'react'
import { registerOrLoginUser } from '../utils';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { AuthTodoContext } from '../context/authTodoContext';

const Login = () => {
  const {setUser, user, setOpenMenu} = useContext(AuthTodoContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {

    if(user?.username){
      return router.push('/')
    };

  }, [router, user?.username])


  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //validate password
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if(!username || !password){
      return setError("All fields are required");
    }

    if(!(regex.test(password))){
      setPassword('');
      return setError('Password must be at least 6 characters long, contain at least one uppercase and lowercase character, and at least one special character.');
    }

    setError('');

    const result = await registerOrLoginUser(username, password, 'login');

    if(!result.user){
      setPassword('');
      return setError(result.message);
    }

    if(result?.user?.username){
      localStorage.setItem('user', JSON.stringify(result.user));
      setUser(result.user);
  
      
      toast.success('you have successfully logged in');
      
      setUsername('');
      setPassword('');

      setOpenMenu(false);
      
      router.push('/');
    }
  }

  return (
    <section className='md:max-w-xl bg-slate-300 mx-auto my-10 p-5 flex flex-col space-y-6 shadow-md'>
      <h1 className='text-center text-xl font-medium uppercase'>ZedTodo - Login</h1>

      <form onSubmit={loginUser} className='flex flex-col space-y-5'>

      {error && <p className='bg-red-200 text-red-500 p-4 rounded'>{error}</p>}

        <div className='flex flex-col space-y-2'>
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            placeholder='username...' 
            className='p-2 rounded border-gray-500 border focus:outline-none focus:border-2 w-full'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className='flex flex-col space-y-2'>
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            placeholder='password...' 
            className='p-2 rounded border-gray-500 border focus:outline-none focus:border-2 w-full'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type='submit' className='bg-green-600 hover:bg-green-700 rounded py-3 text-center text-white uppercase'>Submit</button>
      </form>

      <div>
        <h2>Demo Account</h2>
        <p>username: Guest</p>
        <p>password: Guest12345@@</p>
      </div>

      <div className='flex space-x-2'>
        <p className='font-medium'>Do not have an account?</p>
        <Link href={'/register'} className='underline hover:text-cyan-600'>Register</Link>
      </div>
    </section>
  )
}

export default Login