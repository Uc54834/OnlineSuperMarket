import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    image: {
        type: String
    },
    quantity:{
        type:Number
    }

}, {
    timestamps: true
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;