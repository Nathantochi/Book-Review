import { body, validationResult } from 'express-validator'

export const createBookValidator = [
    body('title')
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage('Title must be at least 3 characters long'),
    body('author')
        .escape()
        .notEmpty()
        .withMessage('Author must be required'),
    body('year')
        .escape()
        .notEmpty()
        .isNumeric()
        .withMessage('Year must be a number'),
    body('summary')
        .escape()
        .notEmpty()
        .withMessage('Summary is required')
]

export const createReviewValidator = [
    body('reviewer')
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage('Reviewer must be at least 3 characters long'),
    body('rating')
        .escape()
        .notEmpty()
        .withMessage('Author must be required'),
    body('year')
        .escape()
        .notEmpty()
        .isNumeric()
        .withMessage('Year must be a number'),
    body('comment')
        .escape()
        .notEmpty()
        .withMessage('Summary is required')
]

export const validationResultMiddleware = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ 
            status : 'fail',
            message: 'Validation error',
            errors: errors.array() 
        })
    }
    next()
}


