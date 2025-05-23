import express from 'express'
import { createUser, loginUser, userProfile} from '../contollers/userControllers.js'
import { protectedAction } from '../middleware/protected.js'

const router = express.Router()

router.post('/signup', createUser)

router.post('/signin', loginUser)

router.get('/profile', protectedAction, userProfile)

export default router;