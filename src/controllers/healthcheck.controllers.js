import {ApiResponse} from "../utils/api-response.js";
const healthCheck = async (req, res) => {
    try {
        await console.log("logic to connect with db");

        res.status(200).json(new ApiResonse(200, { message: 
           "server is running "}));
    } catch (error) {
        console.error("Health check failed", error);
        res.status(500).json(new ApiResponse(500, { message: "server error"
        }));
    }
    
};

export {healthCheck};