const mongoose = require("mongoose");

const database="harshit";

main()
    .then(()=>{
        console.log("connected");
    })
    .catch((err)=>{
        console.log("failed");
    });


async function main() {
    await mongoose.connect(`mongodb://127.0.0.1:27017/harshit`);
}

const schema = new mongoose.Schema({
    name:String,
    email:String,
    age:Number
});