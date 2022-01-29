import * as tokenService from '../services/tokenService'
const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}`

function searchRecipes(ingredients) {
  console.log(BASE_URL)
  console.log(ingredients)
  let queryString = ingredients.join('%2C%20')
  console.log(queryString)

  return fetch(`${BASE_URL}/api/recipes/${queryString}`)
  .then(res => res.json())
  .catch(err => console.log(err, 'frontend err'))
}

function getMyRecipes (user) {
  return fetch(`${BASE_URL}/api/recipes/profile/${user.profile}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`, 'Content-Type': 'application/json'
    }
})
  .then(res => res.json())
}

function saveRecipe (recipe, user) {
  console.log('services', recipe, user)
  return fetch(`${BASE_URL}/api/recipes/${user.profile}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`, 'Content-Type': 'application/json'
    },
    body: JSON.stringify(recipe)
})
  .then(res => res.json())
}


export { 
  searchRecipes, 
  saveRecipe,
  getMyRecipes
}
