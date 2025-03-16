import {createNotice, patronNotifications} from '../controllers/notificationController.js'
import express from 'express'

const router = express.Router()

router.post('/createNotice/:patronId', createNotice)
router.get('/patronNotices/:patronId', patronNotifications)

export default router