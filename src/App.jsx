import { useState} from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import IngredientSearch from './components/IngredientSearch/IngredientSearch'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import MyRecipes from './pages/MyRecipes/MyRecipes'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import * as authService from './services/authService'
import * as recipeService from './services/recipesService'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [myRecipes, setRecipes] = useState([])
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  const handleAddRecipe= (recipe) => {
    recipeService.saveRecipe(recipe, user)
    .then (profileWithRecipe => {
      setRecipes(profileWithRecipe.recipes)
    })
    navigate('/recipes', { state: myRecipes })
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
          element={user ? <MyRecipes myRecipes={myRecipes} user={user}/> : <Navigate to="/login" />}
        />
        <Route
          path="/search"
          element={user ? <IngredientSearch handleAddRecipe={handleAddRecipe} /> : <Navigate to="/login" />}
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
