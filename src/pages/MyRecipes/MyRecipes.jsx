import { useState, useEffect } from 'react'
import * as recipesService from '../../services/recipesService'

const MyRecipes = () => {
  // const [allMyRecipes, setRecipes] = useState([])

  // useEffect(()=> {
  //   recipesService.getMyRecipes()
  //   .then(myRecipes => setRecipes(myRecipes))
  // }, [])

  return (
    <>
      <h1>My Saved Recipes</h1>
      {/* {allMyRecipes.length ? 
        <>
          {allMyRecipes.map(profile=>
            <p key={profile._id}>{profile.name}</p>
          )}
        </>
      :
        <p>No recipes yet</p>
      } */}
    </>
  )
}
 
export default MyRecipes