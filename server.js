import express from 'express';
import  bodyParser from 'body-parser';
import  mongoose from 'mongoose';
import  morgan from 'morgan'
import  cors from 'cors';
import  dotenv from 'dotenv';
import authRoutes from './routes/auth.js' ;
import userRoutes from './routes/user.js';
import productRoutes from './routes/product.js';

const app = express();
dotenv.config();

app.use(cors({origin:"https://openfabric-frontend.vercel.app"}));
// app middleware
//morgan used for logging
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))




//middleware
app.use('/api', authRoutes); 
app.use('/api',userRoutes);
app.use('/api',productRoutes)

// connecting to database
const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT|| 8000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on PORT: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
