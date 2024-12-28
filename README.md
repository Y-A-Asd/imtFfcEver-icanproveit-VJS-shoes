# CS50 Final Project - Shoe Shop

Hello, my name is **Yousof Arab Asadi**. I’m 20 years old and from Iran. After completing CS50, I wanted to build a project that combined what I learned during the course with new technologies and tools. This led to the creation of my **Shoe Shop** website.

---

## Project Idea

The **Shoe Shop** is a single-page e-commerce application designed to showcase and sell shoes online. The application allows users to browse shoes, filter them by brand, add items to a shopping cart, and place orders with shipping options.

---

## Features

The project focuses on creating a user-friendly shopping experience with the following features:

### Users Can:
- Browse products with filtering options by **search** and **brand**.
- View details of each product, including:
  - **Size**
  - **Color**
  - **Price**
  - **Images**
- Add items to the **cart** and manage their cart contents.
- Proceed to **checkout**, select a shipping address, and confirm their order.
- View their **order history**, including:
  - Items purchased
  - Payment method
  - Order status
- Save **addresses** for future orders.

### Note:
The project has a single hardcoded user for simplicity and does not include user registration or login functionality.

---

## Database Structure

The application uses a `db.json` file as the database, which includes the following data structures:

### Users Table
Stores user data, cart, orders, wishlist, and addresses.
```json
{
  "id": "1",
  "name": "ali",
  "email": "yosofasady2@gmail.com",
  "password": "flatlife",
  "cart": [],
  "orders": [
    {
      "id": 1735399523808,
      "date": "2024-12-28T15:25:23.808Z",
      "items": [
        {
          "id": "2",
          "title": "adidas",
          "price": 145,
          "order": 0,
          "size": 44,
          "color": "teal",
          "brand": "adidas",
          "images": "http://localhost:5000/products/adidas/2.webp",
          "quantity": 1
        }
      ],
      "address": "new york",
      "paymentMethod": "PayPal",
      "status": "pending"
    }
  ],
  "wishlist": [],
  "addresses": [
    "new york"
  ]
}```
### Products Table
Stores product information, including size, color, brand, and images.

```json
{
  "id": "1",
  "title": "adidas",
  "price": 245,
  "order": 0,
  "size": [42, 41, 40],
  "color": ["rose", "emerald", "yellow", "gray"],
  "brand": "adidas",
  "images": "http://localhost:5000/products/adidas/1.webp"
}
```

### Technologies Used

The following tools and technologies were used to build the project:

- **JavaScript**: For implementing logic and features.
- **Vite**: For fast development and optimized builds.
- **Navigo**: For client-side routing and page navigation.
- **Tailwind CSS**: For responsive and modern styling.
- **JSON Server**: To simulate a backend and handle data persistence.

### Challenges and Learnings

This project was an incredible learning experience. I applied the fundamentals from **CS50** and explored new tools like **Vite**, **Navigo**, and **Tailwind CSS**. Implementing cart management, filters, and order processing helped me deepen my understanding of JavaScript and single-page applications.

### Conclusion

Building the Shoe Shop project has been a rewarding journey. It has provided me with practical experience in developing real-world applications and equipped me with the skills to take on more complex projects in the future.

### Usage Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Y-A-Asd/imtFfcEver-icanproveit-VJS-shoes.git
   cd imtFfcEver-icanproveit-VJS-shoes```

2. **Install dependencies:**
 ```bash
npm i
```

3. **Start the development server:**

   ```bash
   npm run dev
   
   ```

2. **Start the JSON server :**
 ```bash
npm run start
```
