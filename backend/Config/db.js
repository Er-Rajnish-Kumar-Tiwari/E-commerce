const mongoose=require("mongoose");

const dbConnnection=async()=>{
    try {
        mongoose.connect(process.env.DBURL);
        console.log("DB Connected");
        console.log("Server running on port",process.env.PORT);
    } 
    catch (error) {
        console.log("DB Connections Error");
    }
};

module.exports=dbConnnection;