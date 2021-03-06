const mongoose = require('../../database'); // importing mongoose
const bcrypt = require('bcryptjs');

// defining Schema - database columns
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,		
	},
	lastName: {
		type: String,
		required: true,
	},
	birthDate: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		select: false, 
	},
	passwordResetToken: {
		type: String,
		select: false,
	},
	passwordResetExpires: {
		type: Date,
		select: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},

});

//encrypting the password before saving
UserSchema.pre('save', async function(next){
	const hash = await bcrypt.hash(this.password, 10); // generating a hash for the password with 10 rounds
	this.password = hash;

	next();	
});

// defining the model
const User = mongoose.model('User', UserSchema);
module.exports = User;