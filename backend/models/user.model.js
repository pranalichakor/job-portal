import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phonenumber: { type: String, required: true },
    role: { type: String, enum: ["student", "recruiter"], required: true },
    profile: {
        bio: { type: String },
        skills: {
            type: [String], // ✅ accepts array of strings
            default: [],
        },
        resume: { type: String },
        resumeOriginalName: { type: String },
        company: { type: mongoose.Schema.Types.ObjectId, ref: "company" },
        profilepic: { type: String, default: "" },
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User; // ✅ This fixes the error
