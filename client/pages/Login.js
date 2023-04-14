import React from 'react'
import { useState } from 'react'
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useLogin();
  const navigate = useNavigate();

  //Need to complete with route to verify login (2 options - have functionality within this file or create additional folders/file to handle login functionality)
  const handleLogin = async (e) => {
    e.preventDefault()
    //utilize async function from useLoginHook to initiate login
    await login(email, password)
  }

  //Need to complete with sign-up page -> this should route user to the sign-up page
  const handleSignup = (e) => {
    e.preventDefault()
    navigate('/signup')
  }

  return (
    <div>
      <div>This is where our information or about page would go</div>

      <div className='login'>
        <h3>Log In Here</h3>

        <label>Email</label>
        <input
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label>Password</label>
        <input
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button onClick={handleLogin}>Log In</button>
      </div>
      <button onClick={handleSignup}>Sign Up</button>
    </div >
  )
}

export default Login