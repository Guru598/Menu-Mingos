const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/cartDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Schema for Cart Items
const cartSchema = new mongoose.Schema({
    id: String,
    name: String,
    amount: Number,
    price: Number,
    category: String,
});

const CartItem = mongoose.model("CartItem", cartSchema);

// Schema for Users
const userSchema = new mongoose.Schema({
    username: String,
    userid: String,
    email: String,
    password: String,
});

const User = mongoose.model("User", userSchema);

// Schema for Orders
const orderSchema = new mongoose.Schema({
    order_id: String,          // Same as Cart ID
    order_number: Number,       // Incrementing order number
    user_id: { type: String, default: null },  // User ID or null for guests
    order_total: Number,        // Total price of the order
});

const Order = mongoose.model("Order", orderSchema);

// Register route
app.post("/register", async (req, res) => {
    const { username, userid, email, password } = req.body;
    const userExists = await User.findOne({ userid });
    if (userExists) {
        return res.status(400).send("User ID already exists");
    }
    const newUser = new User({ username, userid, email, password });
    await newUser.save();
    res.send("Registration Successful");
});

// Login route
app.post("/login", async (req, res) => {
    const { userid, password } = req.body;
    const user = await User.findOne({ userid });
    if (user && user.password === password) {
        res.send("Login Successful");
    } else {
        res.status(400).send("Invalid credentials");
    }
});

// Route to create a new order from cart items
app.post("/order", async (req, res) => {
    console.log("Request body received at server:", req.body); 
    const { userid, cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
        return res.status(400).send("No items in cart to create an order.");
    }

    const order_total = cartItems.reduce((sum, item) => sum + (item.price * item.amount), 0);
    const lastOrder = await Order.findOne().sort({ order_number: -1 });
    const newOrderNumber = lastOrder ? lastOrder.order_number + 1 : 1;

    // Debugging - Check userid value
    console.log("Received userid from request:", userid);

    const newOrder = new Order({
        order_id: cartItems[0].id, 
        order_number: newOrderNumber,
        user_id: userid || "user", // Use `userid` or default to "user"
        order_total,
    });

    // Debugging - Check newOrder before saving
    console.log("New Order Object:", newOrder);

    try {
        const savedOrder = await newOrder.save();
        console.log("Order saved successfully:", savedOrder);
        res.send(savedOrder);
    } catch (error) {
        console.error("Error saving order:", error);
        res.status(500).send("Failed to save order");
    }
});

// Existing routes for Cart
app.post("/cart", async (req, res) => {
    const newCartItem = new CartItem(req.body);
    await newCartItem.save();
    res.send(newCartItem);
});

app.get("/cart", async (req, res) => {
    const cartItems = await CartItem.find();
    res.send(cartItems);
});

app.delete("/cart/:id", async (req, res) => {
    await CartItem.deleteOne({ id: req.params.id });
    res.send({ message: "Item removed" });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
