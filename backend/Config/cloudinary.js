const cloudinary=require("cloudinary").v2;

const cloudinaryConnection=async()=>{
    
    cloudinary.config ({
        cloud_name:process.env.Cloud_Name,
        api_key:process.env.Cloud_Key,
        api_secret:process.env.Cloud_Secret
    });
};

module.exports=cloudinaryConnection;