const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema and  Model

const CustomerSchema = new Schema({
    name: String,
    surname: String,
    phone: Number,
    email: String
});

// Everytime new customer is created, we're going to create 
// in 'customer collection' and we're going to base it on 'CustomerSchema'
const Customer = mongoose.model('customer', CustomerSchema);

module.exports = Customer;