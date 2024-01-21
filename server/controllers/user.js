import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User does't exists." });

        const isMatch = await bcrypt.compare(user.password, password);
        if (isMatch) return res.status(400).json({ message: "Invaild credentials." });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        res.status(200).json({ token, user });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exist." })

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await User.create({ username, email, password: passwordHash });
        await user.save();

        res.status(201).json({ message: "User successfully register." });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const getUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);

        res.status(200).json({ user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const enrolledCourse = async (req, res) => {
    try {
        console.log(req.body);
        const { courseId, userId } = req.body;

        let user = await User.findById(userId);
        const enroll = user.courses.get(courseId);

        if (enroll) {
            user.courses.delete(courseId);
        } else {
            user.courses.set(courseId, true);
        }

        await User.findByIdAndUpdate(
            userId,
            { courses: user.courses },
            { new: true }
        );

        user = await User.findById(userId);
        res.status(200).json({ user });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}