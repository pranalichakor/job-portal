import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    Description: {
        type: String,
        // required: true,
    },
    website: {
        type: String,
        // required: true,
    },
    location: {
        type: String,
        // required: true,
    },
    logo: {
        type: String,
        // required: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
}, { timestamps: true });

export default mongoose.model("Company", companySchema);
