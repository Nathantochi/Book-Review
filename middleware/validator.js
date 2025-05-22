import { body, param, validationResult } from 'express-validator'

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
        .withMessage('Reviewer must be required'),
    body('rating')
        .escape()
        .notEmpty()
        .isInt({ min: 1, max: 10 })
        .withMessage('Rating must be a number'),
    body('comment')
        .escape()
        .notEmpty()
        .withMessage('Comment is required'),
    param('bookId')
        .escape()
        .isInt()
        .withMessage('A valid bookId is required')
]

export const validationResultMiddleware = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {

        let format =  errors.array().map((error) => {
            return {
                value: error.value,
                message: error.msg
            }
        })

        return res.status(422).json({ 
            status : 'fail',
            message: 'Validation error',
            errors: format,
        })
    }
    next()
}


