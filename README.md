# 🛒 Product Microservice  
This microservice manages **store products** for the aluminum e-commerce platform. It provides APIs for **CRUD operations**, product validation, and integration with other microservices like **Order Service** and **Auth Service**.

---

## ✅ Features
- Create, Read, Update, Delete **store products**.
- Product validation using **express-validator**.
- MongoDB with **Mongoose** for data modeling.
- RESTful API structure.
- Ready for **API Gateway** and **JWT-based authentication**.

---

## 📂 Project Structure

```bash
product-service/
│
├── src/
│ ├── config/
│ │ └── db.js 
│ │ └── cloudinary.js 
│ ├── controllers/
│ │ └── product.controller.js
│ ├── models/
│ │ └── Product.js
│ ├── routes/
│ │ └── product.routes.js
│ ├── middlewares/
│ │ └── product.validation.js
│ │ └── upload.js
│ ├── uploads/
│ ├── app.js
│ └── server.js
│
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Technologies Used
- **Node.js** + **Express.js** – Server framework.
- **MongoDB** + **Mongoose** – Database and ODM.
- **express-validator** – Input validation.
- **dotenv** – Environment variables.
- **cors** – Cross-Origin Resource Sharing.

---

## 🔧 Installation & Setup
### 1. Clone the repository
```bash
git clone https://github.com/BouzirJawad/product-micro.git
cd product-micro
```

### 2. Install dependencies
```bash
npm install
```

3. Set up environment variables

  Create a .env file in the root directory:
```bash
  PORT= ur choice
  MONGO_URI=mongodb://localhost:27017/aluminum_product_service or name it ur-choice
```

4. Run the service
````bash
npm start
````


or in development mode:

```bash
npm install -g nodemon
nodemon src/server.js
```

📡 API Endpoints

Base URL:

```bash
/api/products
```

Method	Endpoint	Description

```bash
POST	/create	Create a new product
GET	/	Get all products
GET	/:id	Get product by ID
PUT	/:id	Update product by ID
DELETE	/:id	Delete product by ID
```

✅ Example Product Object
````bash
{
  "name": "Aluminum Window Frame",
  "description": "High-quality aluminum frame for windows.",
  "price": 150,
  "stock": 50,
  "category": "windows",
  "image": "https://example.com/image.jpg"
}
````
