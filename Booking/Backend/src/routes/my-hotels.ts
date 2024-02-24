import express, { Request, Response } from 'express';
import cloudinary from 'cloudinary';
import multer from 'multer';
import Hotel, { HotelType } from '../models/hotel';
import { verifyToken } from '../middleware/auth';
import { body } from 'express-validator';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // cannot be greater than 5MB
    }
})

// api/my-hotels/
router.post('/', verifyToken, [
    body('name').notEmpty().withMessage('Name is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('country').notEmpty().withMessage('Country is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('type').notEmpty().withMessage('Type is required'),
    body('pricePerNight').notEmpty().isNumeric().withMessage('Price Per Night is required and must be a number'),
    body('facilites').notEmpty().isArray().withMessage('Facilites is required'),
],
    upload.array("imageFiles", 6), async (req: Request, res: Response) => {
        try {
            const imageFiles = req.files as Express.Multer.File[];
            const newHotel: HotelType = req.body;

            // Upload images to cloudinary
            const uploadPromises = imageFiles.map(async (image) => {
                const base64 = Buffer.from(image.buffer).toString('base64');
                let dataURI = `data:${image.mimetype};base64,${base64}`;
                const res = await cloudinary.v2.uploader.upload(dataURI);
                return res.url;
            });

            const imageUrls = await Promise.all(uploadPromises);
            newHotel.imageUrls = imageUrls;
            newHotel.lastUpdated = new Date();
            newHotel.userId = req.userId;

            const hotel = new Hotel(newHotel);
            await hotel.save();

            res.status(201).send(hotel);
        } catch (error) {
            console.log('Error creating hotel: ', error);
            res.status(500).json({
                message: 'Something Went Wrong'
            })
        }
    });

export default router;