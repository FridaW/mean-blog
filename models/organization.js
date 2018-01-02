/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose

// organization Model Definition
const organizationSchema = new Schema({
  codeName: { type: String, required: true },
  name: { type: String, required: true },
});

// Export Module/Schema
module.exports = mongoose.model('Organization', organizationSchema);
