import { useState, useEffect } from 'react'
import * as recipeService from '../../services/recipesService'

const MyRecipes = ( props ) => {

  const [allMyRecipes, setRecipes] = useState([])
  

  useEffect(()=> {
    recipeService.getMyRecipes(props.user)
    .then(recipes => {
      setRecipes(recipes.reverse())
    })
  }, [props.user, props.myRecipes])

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
              <div className="label">
                <h4>{r.label}</h4>
                <a className='text-gold link' href={r.url}><p>{r.url}</p></a>
                <button className='border border-2 bg-red rounded text-white'>Delete Recipe</button>
              </div>
              <div className="ingred-div">
                <p className="text-green">{r.ingredientLines.join(', ')}</p>
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