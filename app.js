import express from 'express'
import dotenv from 'dotenv'
import bookRoutes from './routes/bookRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { sequelize } from './config/dbConfig.js'
import path from 'node:path'
import fs from 'node:fs'
import { errorResponse } from './utils/erroHandler.js'
import { fileURLToPath } from 'node:url'

dotenv.config()
const PORT = process.env.PORT || 3000;

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('uploads'))

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/api/book', bookRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/users', userRoutes)


app.get('/', (req, res) => {
    res.send('Welcome to the Book Reviews API')
})

app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename
    const filePath = path.join(__dirname, 'uploads', filename)
    
        if (!fs.existsSync(filePath)) {
            return errorResponse(res, 404, 'File not found')
        }
    res.download(filePath, (err) => {
        if (err) {
            return errorResponse(res, 500, 'Error downloading file')
        }
    })

})


sequelize.sync({alter: true})
.then(() => {
    app.listen(PORT, ()=> {
        console.log('Server is running on port: ', PORT)
})
})
.catch((err) => {
    console.log(err, 'Error syncing database')
})

