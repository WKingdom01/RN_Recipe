import { useEffect, useState } from 'react'
import CategoriesScroll from '../components/CategoriesScroll'
import HomeCards from '../components/HomeCards'
import NewRecipesCards from '../components/NewRecipesCards'
import { getMealsByCategory } from '../utils/fetch'

export interface RecipesByCategory {
  strMeal: string
  strMealThumb: string
  idMeal: string
  [keys: string]: unknown
}

function Home() {
  const [recipes, setRecipes] = useState<[RecipesByCategory]>([
    {
      strMeal: '',
      strMealThumb: '',
      idMeal: '',
    },
  ])
  const [category, setCategory] = useState('Beef')

  useEffect(() => {
    getMealsByCategory(category)
      .then((data) => setRecipes(data as [RecipesByCategory]))
      .catch((err: Error) =>
        console.error(
          `Somethin wrong during fetching mealsdb by category: ${err.message}`
        )
      )
  }, [category])

  return (
    <section className="home">
      <CategoriesScroll onClick={setCategory} />
      <div className="flex flex-gap-12 hor-scroll home-cards-container">
        {recipes.map((recipe) => (
          <HomeCards
            key={recipe.idMeal}
            image={recipe.strMealThumb}
            name={recipe.strMeal}
            id={recipe.idMeal}
          />
        ))}
      </div>
      <div className="flex flex-col">
        <h3 className="fs-18">New Recipes</h3>
        <div className="new-recipes-container">
          <NewRecipesCards />
          <NewRecipesCards />
          <NewRecipesCards />
        </div>
      </div>
    </section>
  )
}

export default Home
