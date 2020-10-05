// Author: ArthurPV
// import
const nodemailer = require("nodemailer");
const fs = require("fs");
require('dotenv').config();

// show message
console.log("Welcome to the emails spam script");

// declare variable
let personsData = '';
let simpleObject = [];
let namesArray = [];
let emailsArray = [];
let idArray = [];

// initialize getData function
const getData = path => {
	personsData = JSON.parse(fs.readFileSync(path, "utf-8"));	
	return personsData;
}
// call function
getData("./data/all_emails.json");

// get simple object
simpleObject = Object.values(personsData);

// get beetween array for emails and names

const objectToArray = () => {
	for (let i=0; i < simpleObject[0].length; i++) {
		let personsArray = Object.values(simpleObject[0][i]);
		personsArray = Object.values(personsArray);
		namesArray.push(personsArray[1]);
		emailsArray.push(personsArray[2]);
		idArray.push(personsArray[0]);	
	}
}
// call function
objectToArray();

// send all emails

async function sendEmail() {

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD,
		}
	});

	
	// customize message (name)
	let a = 0;
	let messageName = ``;
	while (a < namesArray.length) {
		messageName = namesArray[a];
		console.log(messageName);
		a++;
	}

	// send mail
	let info = await transporter.sendMail({
		from: "example@gmail.com",
		to: emailsArray.join(", "),
		subject: "Example",
		html: `Hi ${messageName}`
	});

	transporter.sendMail(info, (err, data) => {
		if (err) {
			console.log("Errror: ", err);
		} else {
			console.log("Email sent");
		}
	})
}
// call function
//sendEmail().catch(console.error);
