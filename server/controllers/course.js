import Course from "../models/course.js";

// CREATE 
export const CreateCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        await course.save();

        res.status(200).json("Data Added.");
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// READ
export const getAllCourse = async (req, res) => {
    try {
        const course = await Course.find();
        res.status(200).json(course);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const getCourseByParams = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId);
        res.status(200).json(course);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// UPDATE
export const updateCourseStatus = async (req, res) => {
    try {
        let { courseId } = req.body;

        await Course.findByIdAndUpdate(courseId,
            {
                "$set": {
                    "enrollmentStatus": "Completed"
                }
            },
            { new: true }
        );

        const course = await Course.findById(courseId);
        res.status(200).json(course);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}