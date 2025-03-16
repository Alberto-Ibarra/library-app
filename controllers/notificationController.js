import { createNotification, getPatronNotifications } from "../models/notificationModel.js";

export const createNotice = async (req, res) => {
    try {
        const {type, message} = req.body
        const {patronId} = req.params
        
        const result = await createNotification(type, patronId, message)
        res.status(200).json({message: 'Notification created'})
    } catch (error) {
        console.error(error)
    }
}

export const patronNotifications = async (req, res) => {
    try {
        const {patronId} = req.params
        const result = await getPatronNotifications(patronId)
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
    }
}