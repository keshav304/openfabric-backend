import mongoose from "mongoose";

// database schema
const productSchema = mongoose.Schema({
  userId: String,
  name: String,
  description: String,
  price: Number,
  category: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// converting schema to model
const Products = mongoose.model("Products", productSchema);

//export model so that crud methods can be applied
export default Products;
