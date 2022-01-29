import { useState, useEffect } from 'react'
import * as recipeService from '../../services/recipesService'
import { useLocation } from 'react-router-dom'

const MyRecipes = ( props ) => {
  const location = useLocation()

  const [allMyRecipes, setRecipes] = useState([])
  

  useEffect(()=> {
    recipeService.getMyRecipes(props.user)
    .then(recipes => {
      setRecipes(recipes.reverse())
    })
  }, [props.myRecipes])

  return (
    <>
      <h1>My Saved Recipes</h1>
      {allMyRecipes ?
        <>
          {allMyRecipes.map((r, idx) => 
            <div className="card" key={idx}>
              <div className="img-div">
                {r.image ?
                  <img className="object-fill" src={r.image} alt="" />  
                :
                <p>No Image</p>
                }
              </div>
              <div className="card-body label">
                <h4>{r.label}</h4>
                <a className='text-gold link' href={r.url}><p>{r.url}</p></a>
                <button className='border-double border-4 bg-olive rounded text-white'>Delete Recipe</button>
              </div>
              <div className="card-body">
                <p>{r.ingredientLines.join(', ')}</p>
              </div>
            </div>
            )}
        </>
      :
        <p>No recipes yet</p>
      }
    </>
  )
}
 
export default MyRecipes