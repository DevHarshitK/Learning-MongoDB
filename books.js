const mongoose = require("mongoose");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}

main()
.then((res)=>{
    console.log("Connected Successfully to MongoDB");
})
.catch((err)=>{
    console.log("Connection failed");
    console.log(err);
});

const bookSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxLength: [5,"Too large title"]
    },
    author:{
        type:String
    },
    price:{
        type:Number,
        default: 100
    }
});

const Book = mongoose.model("Book",bookSchema);

const book1 = new Book({
    title:"adasggd",
});

book1.save()
.then(res => {
    console.log(res);
})
.catch(err => {
    console.log(err.errors.title.properties.message);
});