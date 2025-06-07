import Company from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
export const registerCompany = async (req, res) => {
    try {
        const{companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message: "company name is required",
                success: false,
            });
        }
        let company =await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({
                message: "company already exists",
                success: false,
            });
        }
        company = await Company.create({
            name: companyName,
            userID: req.id,
        });        
        return res.status(201).json({
            message: "company created successfully",
            success: true,
            company,
        });
    } catch (error) {
        console.log(error);
        
    }

}
export const getCompany = async (req, res) => {
    try {
        const userID = req.id;
        const companies = await Company.find({userID});
        if (!companies) {
            return res.status(404).json({
                message: "no companies found",
                success: false,
            });
        }
        return res.status(200).json({
            // message: "companies fetched successfully",
            companies,
            success: true,
        });

    } catch (error) {
        console.log(error);
        
    }
}
export const getCompanyById = async (req, res) => {
    try {
        const companyID = req.params.id; // ✅ correct usage
        const company = await Company.findById(companyID); // ✅ fix here

        if (!company) {
            return res.status(404).json({
                message: "company not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "company fetched successfully",
            success: true,
            company,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "internal server error",
            success: false,
        });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const {name, description, website, location} = req.body;
        const file = req.file;
        //cloudinary
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;
    
        const updateData = { name, description, website, location, logo };
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new: true});
        if (!company) {
            return res.status(404).json({
                message: "company not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "company updated successfully",
            success: true,
            company,
        });
        
    } catch (error) {
        console.log(error);
        
    }
}