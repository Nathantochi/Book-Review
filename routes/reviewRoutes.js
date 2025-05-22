import express from 'express'
import { createReview, getAllReviews, getReview, updateReview, deleteReview } from '../contollers/reviewControllers.js'
import { createReviewValidator, validationResultMiddleware } from '../middleware/validator.js'

const router = express.Router()

router.post('/:bookId', createReviewValidator, validationResultMiddleware, createReview)

router.get('/:bookId', getAllReviews)

router.get('/review/:reviewid', getReview)

router.put('/review/:reviewid', updateReview)

router.delete('/review/:reviewid', deleteReview)

export default router;