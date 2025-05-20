import express from 'express'
import { createBook, getAllBooks, getbook, updateBook, deleteBook } from '../contollers/bookControllers.js'
import { createBookValidator, validationResultMiddleware } from '../middleware/validator.js'
import { protectedAction } from '../middleware/protected.js'


const router = express.Router()

router.post('/', createBookValidator, validationResultMiddleware, createBook)

router.get('/', getAllBooks)

router.get('/:id', getbook)

router.put('/:id', updateBook)

router.delete('/:id', protectedAction, deleteBook)


export default router;