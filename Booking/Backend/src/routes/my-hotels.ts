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
    body('starRating').notEmpty().withMessage('Rating is required'),
    body('type').notEmpty().withMessage('Type is required'),
    body('pricePerNight').notEmpty().isNumeric().withMessage('Price Per Night is required and must be a number'),
    body('facilites').notEmpty().isArray().withMessage('Facilites is required'),
],
    upload.array("imageFiles", 6), async (req: Request, res: Response) => {
        try {
            const imageFiles = req.files as Express.Multer.File[];
            const newHotel: HotelType = req.body;

            // Upload images to cloudinary
            const imageUrls = await uploadImages(imageFiles);
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
    }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
    try {
        const hotels = await Hotel.find({ userId: req.userId });
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching details' })
    }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
    const id = req.params.id.toString();
    try {
        const hotel = await Hotel.findOne({
            _id: id,
            userId: req.userId
        });
        res.json(hotel);
    } catch (error) {
        res.status(500).json({
            message: "Error Fetching Hotels"
        })
    }
});

router.put("/:id", verifyToken, upload.array("imageFiles", 6), async (req: Request, res: Response) => {
    const id = req.params.id.toString();
    try {
        const updatedHotel: HotelType = req.body;
        updatedHotel.lastUpdated = new Date();

        const hotel = await Hotel.findOneAndUpdate({
            _id: id,
            userId: req.userId
        }, updatedHotel, { new: true });

        if (!hotel) return res.status(404).json({ message: 'Hotel not found ' });

        const imageFiles = req.files as Express.Multer.File[];
        const updatedImageUrls = await uploadImages(imageFiles);

        hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];

        await hotel.save();

        res.status(201).send(hotel);
    } catch (error) {
        console.log('Error updating hotel: ', error);
        res.status(500).json({
            message: 'Something Went Wrong'
        })
    }
});

async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
        const base64 = Buffer.from(image.buffer).toString('base64');
        let dataURI = `data:${image.mimetype};base64,${base64}`;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}

export default router;