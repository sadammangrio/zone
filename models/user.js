const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema ({
    googleId: String,
    gender: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    age: Number,
    geoLocation: {
        lat: Number,
        log: Number
    },
    street: String,
    streetNo: String,
    postCode: Number,
    city: String,
    state: String,
    country: String,
    createTimestamp: Date,
    modifiedTimestamp: Date
    
});

mongoose.model('users', userSchema);