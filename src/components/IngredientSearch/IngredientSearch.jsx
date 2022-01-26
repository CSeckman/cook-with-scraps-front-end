import { useState } from 'react'
import { searchRecipes } from '../../services/recipesService'

const IngredientSearch = ({ user }) => {
  const [results, setResults] = useState ([])
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
      // .then((apiResults) => {
      //   setResults(apiResults)
      // })
      // .catch(() => {
      //   console.log("something went wrong with setting api results");
      // })
    } catch(err) {
      console.log(err)
    }
  }


  return (
    <main>
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

      </div>
    </main>
  )
}

export default IngredientSearch
