/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS

// User Model Definition
const invitationSchema = new Schema({
  link : { type: String, required: true },
  organization : { type: String, required: true },
  codeName : { type: String, required: true },
  email : { type: String, required: true },
/*  invitee: { type: String, required: true },
  
  inviter: { type: String, required: true },
  status: { type: String, required: true},*/
});

// Export Module/Schema
module.exports = mongoose.model('Invitation', invitationSchema);
