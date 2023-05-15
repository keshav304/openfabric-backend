import express from 'express';
import {getProducts,createProduct,updateProduct,deleteProduct,getProductById } from '../controllers/product.js';
import {  requireSignin } from "../controllers/auth.js";
const productRoutes = express.Router();


productRoutes.get('/products/',getProducts);
productRoutes.get('/product/:id',getProductById)
productRoutes.post('/product/', requireSignin,createProduct);
productRoutes.patch('/product/:id',requireSignin,updateProduct);
productRoutes.delete('/product/:id',requireSignin,deleteProduct);

export default productRoutes;