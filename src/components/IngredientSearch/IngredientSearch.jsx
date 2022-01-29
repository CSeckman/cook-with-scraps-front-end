import { useState } from 'react'
import { searchRecipes } from '../../services/recipesService'

const IngredientSearch = ( props ) => {
  const [results, setResults] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [formData, setFormData] = useState({
    ingredient:''
  })
  
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try{
      setIngredients(arr => [...arr, formData.ingredient.toLowerCase()])
      setFormData({
        ingredient:''
      })
    } catch(err) {
      console.log(err)
    }
  }

  const handleSubmitIngredients = async (ing) => {
    console.log(ing, "all")
    try {
      searchRecipes(ing)
      .then((apiResults) => {
        setResults(apiResults.hits)
        console.log(results, "jsx results after")
      })
      .catch((err) => {
        console.log(err, "something went wrong with setting api results");
      })
    } catch(err) {
      console.log(err)
    }
  }

  const handleSaveRecipe = (r) => {
    let thisRecipe = r.recipe
    props.handleAddRecipe(thisRecipe)
    // try {
    //   // .then (myRecipe => {
    //   //   console.log(myRecipe, "PERSISTED TO DB")
    //   // })
    // } catch(err) {
    //   console.log(err)
    // }
  }

  return (
    <main className="ingred-recipes-div">
      <div className="ingredient-div">
        <h1>Enter your ingredients</h1>
        <form 
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          <label htmlFor='ingredient'>
            Ingredient
          </label>
          <input 
            type='text' 
            autoComplete='off'
            id='ingredient'
            name='ingredient'
            value={formData.ingredient}
            onChange={handleChange}
          />
          <button>Add</button>
        </form>
        <div className="my-ingredients">
          <ul>Ingredients:</ul>
          {ingredients.length ?
            <>
              {ingredients.map((ingredient, idx) => 
              <li key={idx}>{ingredient}</li>
              )}
            </>
          :
          <h5>No Ingredients Yet!</h5>
          }
          <button onClick={() => handleSubmitIngredients(ingredients)}>Submit Ingredients</button>
        </div>
      </div>
      <div className="recipe-results-div">
        <h3>Recipes:</h3>
        {results.length ? 
          <>
            {results.map((r, idx) => 
            <div className="card" key={idx}>
              <div className="card-img-top">
                {r.recipe.image ?
                  <img className="recipe-img" src={r.recipe.image} alt="" />  
                :
                <p>No Image</p>
                }
              </div>
              <div className="card-body label">
                <h4>{r.recipe.label}</h4>
                <a href={r.recipe.url}><p>{r.recipe.url}</p></a>
                <button onClick={() => handleSaveRecipe(r)}>Save Recipe</button>
              </div>
              <div className="card-body">
                <p>{r.recipe.ingredientLines.join(', ')}</p>
              </div>
            </div>
            )}
          </>
        :
        <h5>Submit ingredients to get recipes!</h5>
        }
      </div>
    </main>
  )
}

export default IngredientSearch
