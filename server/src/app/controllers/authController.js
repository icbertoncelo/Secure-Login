const express = require('express');
const User =  require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

const authConfig = require('../../config/auth');

const router = express.Router();

//creating token / unique hash
function generateToken(params = {}) {
	return jwt.sign(params, authConfig.secret, { 
		expiresIn: 86400, //a day 
	});
};

router.post('/register', async (req, res) => {

	const { email } = req.body;
	try {
		if(await User.findOne({ email }))
			return res.jsonp({validEmail : false})//res.status(400).send({ error: 'User already exists' })

		const user = await User.create(req.body); // passing parameters that users have inserted

		user.password = undefined;

		return res.send({ 
			user,
			token: generateToken({ id: user.id }),
			});


	} catch (err) {
		return res.status(400).send({ error: 'Registration failed' });
	}
});

//Authentication
router.post('/authenticate', async (req, res) =>{

	const { email, password } = req.body;

	//finding user and checking if he exists in the database
	const user = await User.findOne({ email }).select('+password');

	if(!user)
		return res.jsonp({validEmail : false})//res.status(400).send({ error: 'User not found' });

	//checking password
	if(!await bcrypt.compare(password, user.password))
		return res.jsonp({validPass : false})//res.status(400).send({ error: 'Invalid password' });

	user.password = undefined;

	res.send({ 
		user, 
		token: generateToken({ id: user.id }), 
	});

});

// function to recovery the user password
router.post('/forgot_password', async (req, res) => {

	const { email } = req.body;

	try{

		const user = await User.findOne({ email });

		if(!user)
			return res.jsonp({validForgEmail : false})//res.status(400).send({ error: 'User not found' });

		//creating token to authorize the correct user to recovery the password
		const token = crypto.randomBytes(20).toString('hex'); //token in hex

		const now = new Date();
		now.setHours(now.getHours() + 1); // defining the expiration time


		await User.findByIdAndUpdate(user.id, {
			'$set': {
				passwordResetToken: token,
				passwordResetExpires: now,
			}
		});

		console.log(token, now);

		var mailOptions = {
			to: email,
			from: 'carlos.ian007@gmail.com',
		    template: 'auth/forgot_password',
			context: { token },
		};

		// send mail with defined transport object
		mailer.sendMail(mailOptions, function(error, info){
		    if(error){
		        return console.log(error);
		        return res.status(400).send({ error: 'Cannot send forgot password email' });
		    }
			
			return res.send();
		   
		});

	} catch (err) {
		res.status(400).send({ err: 'Error on forgot password! Try again' })
	}
});

router.post ('/reset_password', async (req, res) => {

	const { email, token, password } = req.body;

	try{

		const user = await User.findOne({ email })
			.select('+passwordResetToken passwordResetExpires');

		if(!user)
			return res.jsonp({validResEmail : false})//res.status(400).send({ error: 'User not found' });

		if(token !== user.passwordResetToken)
			return res.jsonp({validToken : false})//res.status(400).send({ error: 'Token invalid' });

		const now = new Date();

		if(now > user.passwordResetExpires)
			return res.jsonp({validExpToken : false})//res.status(400).send({ error: 'Token expired! Generate a new one' });	

		user.password = password;

		await user.save();	

		res.send();

	} catch (err) {

 		res.status(400).send({ error: 'Cannot reset password! Try again'});
 		console.log(err);
	}
});

module.exports = app => app.use('/auth', router);