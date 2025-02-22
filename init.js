const mongoose = require("mongoose");
const Chat = require("./models/chats")

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main()
.then(res => {console.log("Connected to DB");})
.catch(err => {console.log(err);});
let moreChats = [
    { 
        from: "Kevin", 
        to: "Lily", 
        message: "Hey Lily, long time no see!", 
        created_at: new Date() 
    },
    { 
        from: "Lily", 
        to: "Kevin", 
        message: "I know, right? How have you been?", 
        created_at: new Date() 
    },
    { 
        from: "Mike", 
        to: "Nancy", 
        message: "Did you watch the new movie?", 
        created_at: new Date() 
    },
    { 
        from: "Nancy", 
        to: "Mike", 
        message: "Not yet! Is it worth watching?", 
        created_at: new Date() 
    },
    { 
        from: "Olivia", 
        to: "Paul", 
        message: "Happy Birthday, Paul! Have a great day!", 
        created_at: new Date() 
    }
];


let Allchats = [
    { 
        from: "Alice",
        to: "Bob", 
        message: "Hey Bob!",
        created_at: new Date() 
    },
    { 
        from: "Bob",
        to: "Alice",
        message: "Hey Alice! How are you?", 
        created_at: new Date() 
    },
    { 
        from: "Charlie", 
        to: "David", 
        message: "Let's meet tomorrow.", 
        created_at: new Date() 
    },
    { 
        from: "David", 
        to: "Charlie", 
        message: "Sure! What time?", 
        created_at: new Date() 
    },
    { 
        from: "Eve", 
        to: "Frank", 
        message: "Can you send me the report?", 
        created_at: new Date() 
    },
    { 
        from: "Frank", 
        to: "Eve", 
        message: "I just sent it!", 
        created_at: new Date() 
    },
    { 
        from: "Grace", 
        to: "Hank", 
        message: "How was your weekend?", 
        created_at: new Date() 
    },
    { 
        from: "Hank", 
        to: "Grace", 
        message: "It was great! Went hiking.", 
        created_at: new Date() 
    },
    { 
        from: "Ivy", 
        to: "Jack", 
        message: "Did you complete the assignment?", 
        created_at: new Date() 
    },
    { 
        from: "Jack", 
        to: "Ivy", 
        message: "Yes, just submitted it.", 
        created_at: new Date() 
    },
    ...moreChats
];
async function insertIntoDB() {
    try {
        await Chat.insertMany(Allchats);
        console.log("Chats inserted successfully!");
    } catch (err) {
        console.error("Error inserting chats:", err);
    } finally {
        mongoose.connection.close();
    }
}
insertIntoDB();