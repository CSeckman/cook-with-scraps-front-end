import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import IngredientSearch from './components/IngredientSearch/IngredientSearch'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import MyRecipes from './pages/MyRecipes/MyRecipes'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import * as authService from './services/authService'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/recipes"
          element={user ? <MyRecipes /> : <Navigate to="/login" />}
        />
        <Route
          path="/search"
          element={user ? <IngredientSearch /> : <Navigate to="/login" />}
        />
        <Route
          path="/changePassword"
          element={user ? <ChangePassword handleSignupOrLogin={handleSignupOrLogin}/> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  )
}

export default App