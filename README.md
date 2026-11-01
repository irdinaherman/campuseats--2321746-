
# CampusEats 🍽️

CampusEats is a React-based food ordering web application developed for the BICS3301 Cross-Platform Software Development course at the International Islamic University Malaysia (IIUM).

The application allows students to browse campus food vendors, explore menus, add food items to a shopping cart, and place orders through a checkout system.

## Project Information

- **Course:** BICS3301 Cross-Platform Software Development
- **Project:** React Milestone 1 (M1)
- **Student:** Ain Irdina Nabihah binti Herman Harianto
- **Matric Number:** 2321746
- **Section:** 01

## Features

### 1. Vendor Browsing
- View available campus food vendors.
- Open individual vendor menu pages.
- View vendor locations and opening hours.
- Handle unavailable vendor pages.

### 2. Menu Browsing
- View menu items and their descriptions.
- Display item prices in Malaysian Ringgit (RM).
- Identify unavailable or sold-out items.
- Browse menu categories.

### 3. Shopping Cart
- Add menu items to the cart.
- Increase item quantities.
- Remove items from the cart.
- Calculate item subtotals and the total price.
- Preserve cart data using localStorage.

### 4. Checkout and Orders
- Enter customer name, phone number and delivery address.
- Validate required checkout information.
- Place orders and view order summaries.
- Automatically clear the cart after successful checkout.
- Preserve order history using localStorage.

### 5. Personal Feature: Dietary Tags and Filter

The personal feature developed for this project allows users to filter menu items according to dietary preferences.

Users can:
- Filter items by dietary tags, such as Vegetarian and High Protein.
- Filter items by menu category.
- Search for menu items by name.
- Combine search and filtering options.
- Clear filters to display the complete menu again.

## Vendors

The application currently includes:

1. **Pink Petal Café** – A café offering meals, drinks, desserts and sides.
2. **Kafe Mahallah Ali** – A campus food vendor.
3. **Kafe Mahallah Aminah** – A campus food vendor.

## Technologies Used

- React
- JavaScript
- Vite
- React Router
- HTML
- CSS
- localStorage
- JSON

## Project Structure

```text
src/
├── components/
│   ├── CheckoutForm.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Layout.jsx
│   ├── MenuItemCard.jsx
│   └── VendorCard.jsx
├── context/
│   └── CartContext.jsx
├── hooks/
│   ├── useLocalStorage.js
│   └── useVendors.js
├── pages/
│   ├── CartPage.jsx
│   ├── CheckoutPage.jsx
│   ├── HomePage.jsx
│   ├── NotFoundPage.jsx
│   ├── OrdersPage.jsx
│   └── VendorPage.jsx
├── App.jsx
├── index.css
└── main.jsx

public/
└── api/
    └── vendors.json
```

## Installation and Setup

### Prerequisites

- Node.js
- npm
- Visual Studio Code (recommended)

### 1. Clone the repository

```bash
git clone https://github.com/irdinaherman/campuseats--2321746-.git
```

### 2. Open the project folder

```bash
cd campuseats--2321746-
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Open the local URL displayed in the terminal, usually:

```text
http://localhost:5173/
```

## Application Routes

| Route | Description |
|---|---|
| `/` | Vendor homepage |
| `/vendor/:id` | Individual vendor menu |
| `/cart` | Shopping cart |
| `/checkout` | Checkout form |
| `/orders` | Order history |
| `*` | 404 page |

## Data Persistence

CampusEats uses browser localStorage to preserve shopping cart items and order history across page refreshes.

The vendor and menu information is loaded from:

```text
public/api/vendors.json
```

## AI Usage

AI tools were used as development assistance during the project. Further details about AI usage, including the tasks supported by AI, are documented in `AI_USAGE.md`.

## Repository

GitHub: https://github.com/irdinaherman/campuseats--2321746-.git
