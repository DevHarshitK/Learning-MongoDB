# MongoDB

    IT IS CASE SENSITIVE

    We use mongosh command to open mongoDB terminal

## Creating and Use DataBase

    By default whenever we start mongosh it creates a termporary db "test", the tasks performed on this db are not saved

    Creation and Using is done by a single command
    * use database-name;

    Just creating them is not sufficient, in order to create a database permanently. We need to insert some data into the database

## BSON (Binary JSON)

    JSON is a text-based data, it adds a step for parsing. It is space inefficient

    BSON is binary method of storing data which makes it efficient and optimized for indexing.It supports more data types than JSON

## Collections

    Data is stored in the form of documents.
    The collections of these documents is called Collections.

    Document ==> Individual Entry (kind of row)
    Collection ==> Collection of these entries (kind of table).

## Insertion

    Inorder to create collection, we need to use:
        db.createCollection("Collection-name");

    Inorder to insert data (or insert and create collection at the same type), we can use:

    * insertOne
        db.collection-name.insertOne({data in js object format});

    * insertMany
        db.collection-name.insertMany([ array of js objects]);

## Showing data

    db.collection-name.find() ==> returns all the data stored

## Find in db

    db.collection-name.find({condition in key value format});

    Example: db.collection-name.find({city:"Delhi"});

    It returns all the values satisfying the condition, but if we need only one data for the given condition, we can use

    db.collection-name.findOne({condition}) ==> gives the object which satisfies the given condition.

    find() method returns a cursor to the documents, data is given is a form of array.

    findOne() returns the actual document

## Operators

    $eq is =
    $gt is >
    $gte is >=
    $lt is <
    $lte is <=
    $eq is =
    $in is used to search somethind from a list
    $or is used a key and a list of conditions is passed as value

    Example: 
    db.collection-name.find({marks:{$gt 75}});
    This will return all the objects in an array whose marks are greater than 75

    db.collection-name.find({city:{$in: ["Delhi","Mumbai"]}});
    This will return array containing elements where city is delhi or mumbai

## Update in db

    There are various Update Operators is MongoDB
    [Documentation](https://www.mongodb.com/docs/manual/reference/operator/update/)

    1. db.collect-name.updateOne(filter,update,options);

        options are optional, its okay even if we don't pass them

        db.test.updateOne({name:"XYZ"},{$set:{marks:99}});

    2. db.collection-name.updateMany(filter,update,options);

        This updates all the values where the specified condition is met

        db.test.updateMany({city:"Delhi"},{$set:{city:"New Delhi"}});

    3. db.collection-name.replaceOne(filter,update,options);

        This replaces the existing document with the new document but keeps the id same.

        db.test.replaceOne({name:"test1"},{name:"user1",marks:100,city:"Delhi"});


## Nesting

    Suppose we have a data
    {
        name:"abc",
        class:10,
        marks:{
            eng:78,
            maths:80
        }
    }

    db.collection-name.find({maths:80})
        this will return null

    Inorder to access the nested object, the nested key must be used in string format

    db.collection-name.find({"marks.maths":80});
        This will work fine !

## Deleting Data

    1. db.collection-name.deleteOne(filter,options);

    2. db.collection-name.deleteMany(filter,option);

        NOTE: db.collection-name.deleteMany({})
                empties the collection

    3. Deleting the entire database

        drop db-name;

# Mongoose

    It is a npm package that creates a connection between MongoDB and Node js

    It is an ODM(Object Data Modeling)

## Using Mongoose

    1. First of all, we need to require it

    2. We need to connect to our database using:

        mongoose.connect(`mongodb://127.0.0.1:27017/${database}`);

        This returns a promise,which is a asynchronus inorder to efficiently connect to our database, we must use "await" method so that we connect first before performing any operations.
        We can use the following code:

        main()
        .then(()=>{
            console.log("connected");
        })
        .catch((err)=>{
            console.log("failed");
        });

        async function main() {
            await mongoose.connect('mongodb://127.0.0.1:27017/db-name');
        }

## Schema

    Structure of the data which can be stored.

    Inorder to define the schema we can use:

    const schema = new mongoose.Schema({
        name:String,
        email:String,
        age:Number
    });

    We can have nested Schemas.
    Example:
    comments: [{ body: String, date: Date }]
    date: { type: Date, default: Date.now }

## Models

    It is special class in Mongoose with which we construct documents.

    const User = mongoose.model("User",userSchema);

    User is a model now, we need to create objects of this model inorder to insert them into the db

    This creates a collection in db, with name "users"

    More Examples: Product => products

## Inserting into the collection

    1. Inserting one document at a time

    const model-prototype = new model-name({all the data to be filled in the schema});

    Inorder to save this, we need to use
    model-prototype.save()
        .then((res)=>{
            callback
        })
        .catch((err)=>{
            callback
        });

    2. Inserting multiple documents at once

    model-name.insertMany([array of model-prototypes])
        .then((res)=>{
            callback
        })
        .catch((err)=>{
            callback
        });

## Operation buffering

    Mongoose allows us to use our models before establishing connection to MongoDB.
    That is why we are not writing the code in the then block after the connection is being established.

## Finding in Mongoose

    Model.find() => returns a Query Object with which we can use .then() method

    Example:
    User.find()
    .then((res)=>{
        for(let p of res){
            console.log(p.name);
        }
    })
    .catch((err)=>{
        console.log(err);
    });

    Model.find(filter) => returns a Query Object containing objects that staisfy the given condition with which we can use .then() method 


    Model.findOne(filter) => returns only one object

    Model.findById(only id as a string) => returns the object based on the id.

## Updating documents

    Model.updateOne(filter, update):
        We can use then and catch methods
        We do not use $set method, we directly provide the new updated value

        Example: User.updateOne({age:18},{age:20});

    Model.updateMany(filter, update):
        This is also a thennable object.
        This updates all the documents which satisfy the given condition

    
    The above two methods return meta data after updation but if we need the new updated document then we need to

    Model.findOneAndUpdate(filter,updated value);
        This returns the old document before the update.
        If we want the updated document, we need to set the value of new to true by default. Its false.
        It can be done passing a third parameter.
        This method is also thennable.

        Example: Model.findOneAndUpdate({name:"Ram"},{age:18},{new:true});
    
    There are more methods like this like 
    Model.findByIdAndUpdate()

## Deleting Documents

    All these given methods are thennable.

    Model.deleteOne(filter); ==> Deletes one document

    Model.deleteMany(filter); ==> Deletes many items

    You can also use:

    Model.findByIdAndDelete(filter);

    Model.findOneAndDelete(filter);

## Schema Validations

    Rules for schema

    We can pass the set of rules as objects to the respective fields

    Example:

    const userSchema = mongoose.Schema({
        name:{
            type:String,
            required:true,
            maxLength: 50
        },
        age:{
            type:Number,
            default: 18
        },
        email:{
            type:String
        }
    })

## Validation while updating

    By default validations do not work on the update methods
    Inorder to do proper validation we must pass a third parameter/object to our update methods.

    Model.findByIdAndUpdate(id,{update here}{runValidators:true})

    We can have custom error messages to our Validations.
    By passing message along with the value to the parameter as an array

    Example:
    name:{
            type:String,
            required:true,
            maxLength: [50,"Too Large"]
        }

    We can get more details through our err in catch block by
    err.errors.field-name.properties.message
