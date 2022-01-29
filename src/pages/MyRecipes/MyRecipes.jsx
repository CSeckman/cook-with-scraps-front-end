import { useState, useEffect } from 'react'

const MyRecipes = ( props ) => {
  const [allMyRecipes, setRecipes] = useState([])

  useEffect(()=> {
    setRecipes(props.myRecipes)
  }, [])

  return (
    <>
      <h1>My Saved Recipes</h1>
      {allMyRecipes ?
        <>
          {allMyRecipes.map((r, idx) => 
            <div className="card" key={idx}>
              <div className="card-img-top">
                {r.image ?
                  <img src={r.image} alt="" />  
                :
                <p>No Image</p>
                }
              </div>
              <div className="card-body label">
                <h4>{r.label}</h4>
                <a href={r.url}><p>{r.url}</p></a>
                <button>Delete Recipe</button>
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