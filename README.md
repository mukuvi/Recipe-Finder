# RecipeFinder

**RecipeFinder** is a responsive and interactive web application that helps users search, explore and view recipes from around the world using [TheMealDB API](https://www.themealdb.com/api.php). Whether you’re looking for a specific dish or just want to discover something new, RecipeFinder provides a beautiful and easy-to-use interface for all types of food lovers.

## Tech Stack

- **Next.js (App Router)** – Modern React framework
- **Tailwind CSS** – Styling and responsiveness
- **Framer Motion** – Subtle, smooth animations
- **TypeScript** – Safer, more maintainable code
- **TheMealDB API** – Recipe and category data

## API Endpoints Used

- **Search Recipes**:  
  `https://www.themealdb.com/api/json/v1/1/search.php?s=`

- **Random Recipe**:  
  `https://www.themealdb.com/api/json/v1/1/random.php`

- **Lookup by ID**:  
  `https://www.themealdb.com/api/json/v1/1/lookup.php?i=`

- **Categories**:  
  `https://www.themealdb.com/api/json/v1/1/categories.php`

- **Filter by Category**:
  `https://www.themealdb.com/api/json/v1/1/filter.php?c=`

---

## How to Run Locally

1. Install dependencies:
  ```bash
  npm install
  ```

2. Start the dev server:
  ```bash
  npm run dev
  ```

3. Open:
  `http://localhost:3000`

## Features

- Recipe search by name
- Random meal generation ("Surprise me")
- Category browsing with meal lists
- Detailed recipe view (ingredients, instructions, optional YouTube embed)
