import { Link } from 'react-router-dom'
import React from 'react'
import { useUserContext } from '../hooks/useUserContext'
import { useLogout } from '../hooks/useLogout'

const Navigation = () => {
  const { logout } = useLogout()
  const { user } = useUserContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className='container'>
        <Link to='/'>
          <h1> In Season Locally</h1>
        </Link>
        <nav>
          {/* only outut if we have a user email*/}
          {user && (
            <div>
              <span className="emailaddy">{user.email}</span>
              <button onClick={handleClick}>Log Out</button>
            </div>
          )}
          {!user && (
            <div>
              {/* <Link to='/login'>Login</Link> */}
              <Link to='/signup'>Sign Up</Link>
              <Link to='/'>About Us</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navigation