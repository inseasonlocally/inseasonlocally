import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'
//User context
import { useUserContext } from './hooks/useUserContext'

//Pages and Components
import Signup from './pages/Signup'
import Login from './pages/Login'
import Landing from './pages/Landing'
import Navigation from './components/NavBar'
import ReviewTable from './components/ReviewTable'
import AddReview from './pages/AddReview'
import UserReviewTable from './components/UserReviewTable'

const App = () => {
  const { user } = useUserContext()
  return (
    <div className='app'>
      <BrowserRouter>
        <Navigation />

        <Routes>
          {/* First conditional route - if user is logged in and present in Local Storage, take to Landing page. Otherwise, navigate to Login page */}
          <Route
            path='/'
            element={user ? <Landing /> : <Navigate to='/login' />}
          />

          {/* Second conditional route - if user goes to login page, but is signed in, send them to landing page. Otherwise, go to the Login Page */}

          <Route
            path='/login'
            element={!user ? <Login /> : <Navigate to='/' />}
          />

          {/* Third conditional route - if user goes to signup page, but is signed in, send them to landing page. Otherwise, go to the Signup Page */}
          <Route
            path='/signup'
            element={!user ? <Signup /> : <Navigate to='/' />}
          />

          {/* Route for reviews once button is clicked */}
          <Route
            path='/reviews'
            element={!user ? <Login /> : <ReviewTable />}
          />

          <Route
            path='/addreviews'
            element={!user ? <Login /> : <AddReview />}
          />

          <Route
            path='/editreviews'
            element={!user ? <Login /> : <UserReviewTable />}
          />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App