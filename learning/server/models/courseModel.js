import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title'],
        minLength: [4, 'Title must be of minimum 4 characters'],
        maxLength: [12, 'Title must be of maximum 12 characters'],
    },
    description: {
        type: String,
        required: [true, "Please enter description"],
        minLength: [20, 'Description must be of minimum 20 characters'],
    },
    lectures: [
        {
            title: {
                type: String,
                required: [true, 'Please enter a title'],
            },
            description: {
                type: String,
                required: [true, "Please enter description"],
                minLength: [20, 'Description must be of minimum 20 characters'],
            },
            video: {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            }
        }
    ],
    poster: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    views: {
        type: Number,
        default: 0
    },
    numOfVideos: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: [true, 'Please mention category']
    },
    createdBy: {
        type: String,
        required: [true, 'Please provide a author']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export const Course = mongoose.model("Course", schema);