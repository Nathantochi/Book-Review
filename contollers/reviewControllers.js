import Review from '../models/reviewModels.js'
import Book from '../models/bookModels.js'

// Create a new review
export const createReview = async (req, res) => {
    const { rating, comment, reviewer} = req.body
    const  bookId  = Number(req.params.bookId)
    const checkBook = await Book.findByPk(bookId)
    

    if (!checkBook) {
        return res.status(404).json({
            status: 'false',
            message: 'Book not found',
            data: []
        })
    }

    // Check if all fields are provided
        const review = await Review.create({
            rating,
            comment,
            reviewer,
            bookId: Number(bookId)
        })

        if (!review) {
            return res.status(400).json({
                status: 'false',        
                message: 'Review not created',
                data: []
            })
        }
       res.status(201).json({
            status: 'true',
            message: 'Review created successfully',
            data : review
        })
    
}

// Get all reviews
export const getAllReviews = async (req, res) => {

    const  bookId  = Number(req.params.bookId)
    const checkBook = await Book.findByPk(bookId)
    const {year, author} = req.query

    if (!checkBook) {
        return res.status(404).json({
            status: 'false',
            message: 'Book not found',
            data: []
        })
    }

    const where = { bookId};
    if (year) {
        where.year = year;
    }

    if (author) {
        where.author = author;
    }

    const reviews = await Review.findAll({where: where})
    
    if (!reviews) {
        return res.status(400).json({
            status: 'false',
            message: 'No reviews found',
            data: []
        })
    }
    res.status(200).json({
        status: 'true',
        message: 'Reviews retrieved successfully',
        data: reviews
    })
}

//get a single review
export const getReview = async (req, res) => {
    const { id } = req.params
    const review = await Review.findByPk(Number(id))
    if (!review) {
        return res.status(404).json({
            status: 'false',
            message: 'Review not found',
            data: []
        })
    }
        return res.status(200).json({
            status: 'true',
            message: 'Review retrieved successfully',
            data: review
    })
}

// Update a review
export const updateReview = async (req, res) => {
    const { id } = req.params
    const { title, author, year, summary } = req.body
    const review = await Review.findByPk(Number(id))
    if (!review) {
        return res.status(400).json({
            status: 'false',
            message: 'Review not found',
            data: []
        })
    }
    await review.update(req.body)
    res.status(200).json({
        status: 'true',
        message: 'Review updated successfully',
        data: review
    })
}

// Delete a review
export const deleteReview = async (req, res) => {
    const { id } = req.params
    const review = await Review.findByPk(Number(id))
    if (!review) {
        return res.status(400).json({
            status: 'false',
            message: 'Review not found',
            data: []
        })
    }
    await review.destroy()
    return res.status(200).json({
        status: 'true',
        message: 'Review deleted successfully',
        data: []
    })
}