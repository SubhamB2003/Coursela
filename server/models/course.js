import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    name: {
        type: String,
    },
    instructor: {
        type: String
    },
    description: { type: String },
    enrollmentStatus: { type: String },
    thumbnail: { type: String },
    duration: { type: String },
    schedule: { type: String },
    location: { type: String },
    prerequisites: {
        type: Array,
        default: []
    },
    syllabus: [
        {
            week: {
                type: Number
            },
            topic: {
                type: String
            },
            content: {
                type: String
            }
        }
    ]
}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);
export default Course;