const mongoose = require("mongoose")

async function Connection(){
    try {
        await mongoose.connect(process.env.MongoDB_URL)
        console.log("MongoDB connected Sucessfully");
        
    } catch (error) {
        console.error(`Something went wrong: ${error}`);
    }
}
module.exports = Connection