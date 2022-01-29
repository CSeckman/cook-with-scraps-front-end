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
      setIngredients(arr => [...arr, formData.ingredient.replace(/\s/g , "-").toLowerCase()])
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

  const handleClearIngredients = () => {
    setIngredients([])
    setResults([])
  }

  const handleSaveRecipe = (r) => {
    let thisRecipe = r.recipe
    props.handleAddRecipe(thisRecipe)
  }

  return (
    <main className="ingred-recipes-div">
      <div className="ingredient-div">
        <h1>Enter your ingredients here:</h1>
        <form 
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          <input 
            className='border-4 border-double rounded border-black'
            type='text' 
            autoComplete='off'
            id='ingredient'
            name='ingredient'
            value={formData.ingredient}
            onChange={handleChange}
          />
          <button className="border-4 border-double rounded text-white bg-green">Add</button>
        </form>
        <div className="my-ingredients">
          {ingredients.length ?
            <>
            <ul>Ingredients:</ul>
              {ingredients.map((ingredient, idx) => 
              <li key={idx}>{ingredient}</li>
              )}
            </>
          :
          ""
          }
          <button className="border-4 border-double rounded text-white bg-olive" onClick={() => handleSubmitIngredients(ingredients)}>Submit Ingredients</button>
          <button className="border-4 border-double rounded text-white bg-orange" onClick={() => handleClearIngredients()}>Clear Ingredients</button>
        </div>
      </div>
      <div className="recipe-results-div">
        <h3>Recipes:</h3>
        {results.length ? 
          <>
            {results.map((r, idx) => 
            <div className="card" key={idx}>
              <div className="img-div">
                {r.recipe.image ?
                  <img className="object-fill" src={r.recipe.image} alt="" />  
                :
                <p>No Image</p>
                }
              </div>
              <div className="label">
                <h4>{r.recipe.label}</h4>
                <a className='text-gold link' href={r.recipe.url}><p>{r.recipe.url}</p></a>
                <button className='border-double border-4 bg-orange rounded text-white' onClick={() => handleSaveRecipe(r)}>Save Recipe</button>
              </div>
              <div className="ingred-div">
                <p className="text-green">{r.recipe.ingredientLines.join(', ')}</p>
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
