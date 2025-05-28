# 🍽️ RecipeFinder

**RecipeFinder** is a responsive and interactive web application that helps users search, explore and view recipes from around the world using [TheMealDB API](https://www.themealdb.com/api.php). Whether you’re looking for a specific dish or just want to discover something new, RecipeFinder provides a beautiful and easy-to-use interface for all types of food lovers.

---

## 📌 Features

- 🔍 **Search Recipes** – Find meals by name or ingredient.
- 🎲 **Random Recipe Generator** – Let the app surprise you with a random meal.
- 📄 **Recipe Details** – View ingredients, instructions, and a cooking video.
- 🗂️ **Categories Page** – Explore meals grouped by category.
- 👨‍🍳 **About Page** – Learn more about the mission and creators of RecipeFinder.
- 📱 **Mobile Responsive** – Works seamlessly on phones, tablets, and desktops.
- 🍔 **Hamburger Menu** – Optimized mobile navigation menu.
- 🚫 **404 Page** – Custom error page for non-existing routes.

---

## 🧱 Tech Stack

- **HTML5** – Structure
- **Tailwind CSS** – Styling and responsiveness
- **JavaScript (ES6)** – Logic, interactivity, and API calls
- **Font Awesome** – Icons and UI enhancements
- **TheMealDB API** – Recipe and category data

---

## 🧠 Pages Overview

| File              | Description                                       |
| ----------------- | ------------------------------------------------- |
| `index.html`      | Main page with search, random recipe, and results |
| `categories.html` | Lists all meal categories dynamically             |
| `about.html`      | Introduces the app’s mission and team             |
| `404.html`        | Custom error page                                 |
| `script.js`       | Main JavaScript logic and API interactions        |

---

## 🌐 API Endpoints Used

- **Search Recipes**:  
  `https://www.themealdb.com/api/json/v1/1/search.php?s=`

- **Random Recipe**:  
  `https://www.themealdb.com/api/json/v1/1/random.php`

- **Lookup by ID**:  
  `https://www.themealdb.com/api/json/v1/1/lookup.php?i=`

- **Categories**:  
  `https://www.themealdb.com/api/json/v1/1/categories.php`

---

## 🛠️ How to Run Locally

1. Clone or download the repository:
   ```bash
   git clone https://github.com/yourusername/recipefinder.git
   ```
