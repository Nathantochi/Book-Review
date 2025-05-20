import express from 'express'

const router = express.Router()

router.post('/:bookId', (req, res) => {
    //create a book
})

router.get('/:bookId', (req, res) => {
    //get all reviews for a book
})

router.get('/:bookId/:reviewid', (req, res) => {
    //get a review for a book
})

router.get('/review/:reviewid', (req, res) => {
    //get a review 
})

router.put('/review/:reviewid', (req, res) => {
    //edit a book
})

router.delete('/review/:reviewid', (req, res) => {
    //delete a book
})

export default router;