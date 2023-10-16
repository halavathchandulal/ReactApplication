import React, {useState, useEffect} from 'react'
import Dish from './components/Dish'
import Header from './components/Header'
import MenuCategories from './components/MenuCategories'
import './App.css'

const dishesApiUrl =
  'https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099'

const App = () => {
  const [menuCategories, setMenuCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)
  const [dishes, setDishes] = useState([])
  const [cartCount, setCartCount] = useState(0)

  // const dishesApiUrl = 'YOUR_DISHES_API_URL_HERE'

  useEffect(() => {
    // Fetch menu data from the dishesApiUrl
    fetch(dishesApiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        setMenuCategories(data.table_menu_list)
        setActiveCategory(data.table_menu_list[0])
        setDishes(data.category_dishes)
      })
      .catch(error => console.error('Error fetching data:', error))
  }, [dishesApiUrl])

  const handleCategoryChange = category => {
    setActiveCategory(category)
  }

  const handleIncrement = dish => {
    const updatedDishes = dishes.map(item =>
      item.id === dish.id ? {...item, quantity: item.quantity + 1} : item,
    )
    setDishes(updatedDishes)
    setCartCount(prevCount => prevCount + 1)
  }

  const handleDecrement = dish => {
    if (dish.quantity > 0) {
      const updatedDishes = dishes.map(item =>
        item.id === dish.id ? {...item, quantity: item.quantity - 1} : item,
      )
      setDishes(updatedDishes)
      setCartCount(prevCount => prevCount - 1)
    }
  }

  return (
    <div>
      <Header restaurantName="UNI Resto Cafe" />
      <MenuCategories
        categories={menuCategories}
        handleCategoryChange={handleCategoryChange}
      />
      {activeCategory &&
        dishes.map(dish => {
          if (dish.menu_category === activeCategory.menu_category) {
            return (
              <div key={dish.id}>
                <h2>{dish.dish_name}</h2>
                <p>
                  {dish.dish_currency} {dish.dish_price}
                </p>
                <p>{dish.dish_description}</p>
                <p>{dish.dish_calories} Calories</p>
                <img src={dish.dish_image} alt={dish.dish_name} />
                <button type="button" onClick={() => handleDecrement(dish)}>
                  -
                </button>
                <span>{dish.quantity}</span>
                <button type="button" onClick={() => handleIncrement(dish)}>
                  +
                </button>
                {dish.addonCat && <p>{dish.addonCat}</p>}
                {dish.dish_Availability === false && <p>Not available</p>}
              </div>
            )
          }
          return null
        })}

      <p>Total Cart Count: {cartCount}</p>
    </div>
  )
}

export default App
