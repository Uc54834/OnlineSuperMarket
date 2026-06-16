import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { connectDB } from "./mongo.js";
import Cart from "./models/Cart.js";
import User from "./models/User.js";

const app = express();

// ── Security headers ──────────────────────────────────────────────────────────
app.use(helmet());

// ── CORS ──────────────────────────────────────────────────────────────────────
// ALLOWED_ORIGINS = comma-separated list, e.g.
//   http://localhost:3000,http://localhost,https://yourdomain.com
const rawOrigins = process.env.ALLOWED_ORIGINS || "http://localhost:3000";
const allowedOrigins = rawOrigins.split(",").map((o) => o.trim());

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (Postman, curl, mobile apps)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error(`CORS: origin "${origin}" not allowed`));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,   // some legacy browsers choke on 204
};

app.use(cors(corsOptions));
// Handle all OPTIONS pre-flight requests
app.options("/{*path}", cors(corsOptions));

// ── Body parser ───────────────────────────────────────────────────────────────
app.use(express.json());

// ── Database ──────────────────────────────────────────────────────────────────
connectDB();

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});

// ── Cart routes ───────────────────────────────────────────────────────────────
app.post("/addToCart", async (req, res) => {
    try {
        const product = req.body;
        const newCartItem = await Cart.create({
            name:     product.name,
            price:    product.price,
            image:    product.image,
            quantity: product.quantity ?? 1,
        });
        res.status(201).json({ message: "Product added to cart", cartItem: newCartItem });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/increase", async (req, res) => {
    try {
        const { name } = req.body;
        await Cart.findOneAndUpdate({ name }, { $inc: { quantity: 1 } }, { new: true });
        res.json({ message: "Quantity incremented" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/removeItem", async (req, res) => {
    try {
        const { name } = req.body;
        await Cart.findOneAndDelete({ name });
        res.json({ message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/getCartItems", async (_req, res) => {
    try {
        const items = await Cart.find({});
        res.json({ message: "Cart items retrieved", items });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ── User routes ───────────────────────────────────────────────────────────────
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ message: "User already registered!" });
        const newUser = await User.create({ name, email, password });
        return res.status(201).json({
            message: "User successfully registered!",
            user: { id: newUser._id, name: newUser.name, email: newUser.email },
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found!" });
        if (user.password !== password) return res.status(401).json({ message: "Invalid credentials!" });
        return res.json({
            message: "User logged in successfully!",
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// ── Start server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅  Server running on http://0.0.0.0:${PORT}`);
    console.log(`   Allowed origins: ${allowedOrigins.join(", ")}`);
});
