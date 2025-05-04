const mongoose = require('mongoose');
const User = require('./User');

const adminSchema = new mongoose.Schema({
  adminRole: {
    type: String,
    required: true,
    enum: ['superadmin', 'moderator', 'support']
  },
  permissions: [String],
  lastAccess: Date
});

const Admin = User.discriminator('Admin', adminSchema);
module.exports = Admin;