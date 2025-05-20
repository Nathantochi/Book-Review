import { body, validationResult } from 'express-validator'

export const createBookValidator = [
    body('title')
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage('Title must be at least 3 characters long'),
    body('author')
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage('Author must be at least 3 characters long'),
    body('year')
        .notEmpty()
        .isNumeric()
        .withMessage('Year must be a number'),
    body('summary')
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


