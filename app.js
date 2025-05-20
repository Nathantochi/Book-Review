import express from 'express'
import dotenv from 'dotenv'
import bookRoutes from './routes/bookRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import { sequelize } from './config/dbConfig.js'

dotenv.config()
const PORT = process.env.PORT || 3000;

const app = express()
app.use(express.json())

app.use('/api/book', bookRoutes)
app.use('/api/reviews', reviewRoutes)

sequelize.sync({alter: true})
.then(() => {
    app.listen(PORT, ()=> {
        console.log('Server is running on port: ', PORT)
})
})
.catch((err) => {
    console.log(err, 'Error syncing database')
})

