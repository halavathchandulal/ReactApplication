import React from 'react'

const MenuCategories = ({categories, handleCategoryChange}) => (
  <div>
    {categories.map(category => (
      <button
        key={category.id}
        type="button"
        onClick={() => handleCategoryChange(category)}
      >
        {category.menu_category}
      </button>
    ))}
  </div>
)

export default MenuCategories
