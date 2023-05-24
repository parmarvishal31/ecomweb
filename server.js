import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import connectdb from './config/db.js'
import routes from './routes/authRoute.js'
import cors from 'cors'
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import path from 'path'
// rest obj 

const app = express()
// dotenv config
dotenv.config()
// database
connectdb()
// mid
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(express.static(path.join(__dirname, './client/build')))
// routes
app.use('/api/v1/auth', routes)
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);


app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

// port
const PORT = process.env.PORT || 8000
// serverlisten 

app.listen(PORT, () => {
    console.log(`server running on Port ${PORT} And dev mod is ${process.env.DEV_MODE}`.yellow.underline);
})
