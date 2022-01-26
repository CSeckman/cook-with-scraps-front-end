import { useState } from 'react'

const IngredientSearch = ({ user }) => {
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

  const handleSubmitIngredients = (ing) => {
    console.log(ing, "all")
    
  }


  return (
    <main>
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
    </main>
  )
}

export default IngredientSearch
