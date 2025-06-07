import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        // console.log("Decoded Token:", decode); // 👈 ADD THIS
        // req.id = decode.userID; // ✅ correct key
        // next();
                if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };
        req.id = decode.userID;
        next();
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;