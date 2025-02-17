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