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

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:Number
});

const User = mongoose.model("User",userSchema);

// const user1 = new User({
//     name:"Bruce Banner",
//     email:"hulk@examle.com",
//     age:18
// });

// const user2 = new User({
//     name:"Clinton Barton",
//     email:"hawkeye@examle.com",
//     age:20
// });

// user1.save()
//     .then((res)=>{
//         console.log("Saved to DB, user 1");
//     })
//     .catch((err)=>{
//         console.log(err);
//     });
// user2.save()
//     .then((res)=>{
//         console.log("Saved to DB, user 2");
//     })
//     .catch((err)=>{
//         console.log(err);
//     });

User.findOne({name:"Tony Stark"})
    .then((res)=>{
        console.log(res);
        if(res==null){
            throw new Error("User not found");
        }
    })
    .catch((err)=>{
        console.log(err);
    });

User.findOneAndUpdate({name:"Hawkeye"},{age:42},{new:true})
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
});