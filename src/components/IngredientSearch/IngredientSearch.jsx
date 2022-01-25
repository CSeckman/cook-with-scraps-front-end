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
    try {
      setIngredients(ingredients.push(formData))
    } catch (err) {
      console.log('ingredient not added')
    }
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
      </form>
    </main>
  )
}

export default IngredientSearch