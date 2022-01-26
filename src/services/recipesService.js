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

export { searchRecipes }
