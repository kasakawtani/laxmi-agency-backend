# Laxmi Agency Backend - Copilot Instructions

## Architecture Overview

**Stack**: Express.js + MongoDB + Node.js  
**Pattern**: MVC-style with controllers + models + routes  
**Database**: MongoDB with Mongoose ODM

### Directory Structure
- `src/config/db.js` - MongoDB connection
- `src/controllers/` - Business logic (authController, itemController, etc.)
- `src/models/` - Mongoose schemas (User, Item, Inquiry, etc.)
- `src/routes/` - Express route definitions
- `server.js` - Main entry point

## Key Architecture Patterns

### Request Flow
1. **Route** (`src/routes/*.js`) - Express route definition
2. **Controller** (`src/controllers/*.js`) - Handle request logic
3. **Model** (`src/models/*.js`) - Database query + validation
4. **Response** - Send JSON response with proper status codes

### Controller Pattern (Standard)
```javascript
// src/controllers/itemController.js
exports.createItem = async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving item" });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching items" });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Item.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Item not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating item' });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Item.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting item' });
  }
};
```

### Route Pattern (Standard)
```javascript
// src/routes/itemRoutes.js
const express = require("express");
const router = express.Router();
const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

router.post("/", createItem);      // POST /api/items
router.get("/", getItems);         // GET /api/items
router.put("/:id", updateItem);    // PUT /api/items/:id
router.delete("/:id", deleteItem); // DELETE /api/items/:id

module.exports = router;
```

### Model Pattern (Mongoose)
```javascript
// src/models/Item.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    detail: String,
    supplierName: String,
    contact: String,
  },
  { timestamps: true } // Auto-adds createdAt, updatedAt
);

module.exports = mongoose.model("Item", itemSchema);
```

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Items CRUD
```javascript
POST   /items           - Create item { itemName, category, detail, supplierName, contact }
GET    /items           - Get all items
PUT    /items/:id       - Update item
DELETE /items/:id       - Delete item
```

### Categories
```javascript
POST   /categories      - Create category { categoryName }
GET    /categories      - Get all categories
PUT    /categories/:id  - Update category
DELETE /categories/:id  - Delete category
```

### Inquiries (Public)
```javascript
POST   /inquiries       - Submit inquiry { name, contactNumber, brand, message }
GET    /inquiries       - Get all inquiries (admin)
DELETE /inquiries/:id   - Delete inquiry (admin)
```

### Auth
```javascript
POST   /auth/login      - Login { email, password } → { token, role, email }
POST   /auth/register   - Register new user { email, password, role }
```

### Sellers
```javascript
POST   /sellers         - Create seller { sellerName, contact, address }
GET    /sellers         - Get all sellers
PUT    /sellers/:id     - Update seller
DELETE /sellers/:id     - Delete seller
```

### Stock
```javascript
POST   /stocks          - Create stock entry
GET    /stocks          - Get all stock entries
PUT    /stocks/:id      - Update stock
DELETE /stocks/:id      - Delete stock
```

## Response Patterns

### Success Response
```javascript
// 201 - Created
res.status(201).json(item);

// 200 - OK
res.json(items);
res.json({ message: "Success", data: items });
```

### Error Response
```javascript
// 400 - Bad Request
res.status(400).json({ message: "Name, contact number, and message are required." });

// 404 - Not Found
res.status(404).json({ message: "Item not found" });

// 500 - Server Error
res.status(500).json({ message: "Error saving item" });
```

## Common Patterns

### Validation (In Controller)
```javascript
if (!name || !contactNumber || !message) {
  return res.status(400).json({ 
    message: "Name, contact number, and message are required." 
  });
}
```

### Error Handling (Standard Try-Catch)
```javascript
try {
  // Logic here
} catch (err) {
  console.error("Error:", err);
  res.status(500).json({ message: "Error operation name" });
}
```

### Not Found Check
```javascript
const item = await Item.findByIdAndDelete(id);
if (!item) {
  return res.status(404).json({ message: "Item not found" });
}
```

## Database Models Reference

### User
- `email` (String, required, unique)
- `password` (String, required, hashed)
- `role` (String: "admin" | "customer")
- `createdAt`, `updatedAt` (Timestamps)

### Item
- `itemName` (String, required)
- `category` (String, required)
- `detail` (String)
- `supplierName` (String)
- `contact` (String)
- `timestamps`

### Inquiry
- `name` (String, required)
- `contactNumber` (String, required)
- `brand` (String, optional)
- `message` (String, required)
- `createdAt`, `updatedAt`

### Category
- `categoryName` (String, required)
- `description` (String)
- `timestamps`

### Seller
- `sellerName` (String, required)
- `contact` (String)
- `address` (String)
- `timestamps`

### Stock
- `itemId` (ObjectId reference)
- `quantity` (Number)
- `location` (String)
- `lastRestocked` (Date)
- `timestamps`

## Environment Setup

### .env File (Example)
```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/laxmi-agency
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key_here
```

### Connection Pattern (db.js)
```javascript
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
```

## Adding a New Resource

### Step 1: Create Model (`src/models/[Resource].js`)
```javascript
const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
}, { timestamps: true });

module.exports = mongoose.model("Resource", resourceSchema);
```

### Step 2: Create Controller (`src/controllers/[resource]Controller.js`)
```javascript
const Resource = require("../models/Resource");

exports.createResource = async (req, res) => {
  try {
    const resource = new Resource(req.body);
    await resource.save();
    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ message: "Error saving resource" });
  }
};

exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: "Error fetching resources" });
  }
};
```

### Step 3: Create Routes (`src/routes/[resource]Routes.js`)
```javascript
const express = require("express");
const router = express.Router();
const { createResource, getResources } = require("../controllers/resourceController");

router.post("/", createResource);
router.get("/", getResources);

module.exports = router;
```

### Step 4: Register in `server.js`
```javascript
app.use("/api/resources", require("./src/routes/resourceRoutes"));
```

## Development Workflow

### Start Server
```bash
npm run dev  # Uses nodemon (auto-reload)
```

### Test Endpoints
Use Postman or curl:
```bash
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -d '{"itemName":"Fabric","category":"Textiles"}'
```

## CORS Configuration
```javascript
app.use(cors({
  origin: "http://localhost:5173",  // Frontend URL
  credentials: true
}));
```

## Common Mistakes to Avoid

❌ **Don't forget try-catch** - All async operations need error handling  
❌ **Don't skip status codes** - Use 201 for create, 404 for not found, 500 for errors  
❌ **Don't return without sending response** - Always end with `res.json()` or `res.status()`  
❌ **Don't forget timestamps** - Add `{ timestamps: true }` to schemas  
❌ **Don't hardcode port** - Use `process.env.PORT || 5000`  
❌ **Don't expose passwords** - Never return password in response  

## Dependencies

```json
{
  "cors": "^2.8.5",        // Enable CORS
  "dotenv": "^17.2.3",     // Environment variables
  "express": "^5.2.1",     // Web framework
  "mongoose": "^9.0.2"     // MongoDB ODM
}
```

## File Reference

| File | Purpose |
|------|---------|
| `server.js` | Main entry, middleware setup, route registration |
| `src/config/db.js` | MongoDB connection |
| `src/models/Item.js` | Item schema |
| `src/models/Inquiry.js` | Inquiry schema |
| `src/models/User.js` | User authentication schema |
| `src/controllers/itemController.js` | Item business logic |
| `src/controllers/inquiryController.js` | Inquiry logic |
| `src/routes/itemRoutes.js` | Item endpoints |
| `src/routes/inquiryRoutes.js` | Inquiry endpoints |

---

**Last Updated**: Feb 21, 2026  
**Port**: 5000 (configurable via PORT env var)  
**Database**: MongoDB (via Mongoose)  
**Start**: `npm run dev` or `npm start`
