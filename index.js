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
console.log(typeof simpleObject);

// initialize getData function
const getData = path => {
	personsData = JSON.parse(fs.readFileSync(path, "utf-8"));	
	return personsData;
}
// call function
getData("./data/all_emails.json");

// get emails data
// get simple object
// get beetween array for emails and names
simpleObject = Object.values(personsData);
console.log(simpleObject[0].length);

const objectToArray = () => {
	for (let i=0; i < simpleObject[0].length; i++) {
		let personsArray = Object.values(simpleObject[0][i]);
		console.log(personsArray);
		personsArray = Object.values(personsArray);
		console.log(personsArray)
		namesArray.push(personsArray[1]);
		emailsArray.push(personsArray[2]);
		idArray.push(personsArray[0]);	
		console.log(personsArray);
		console.log(namesArray);
		console.log(emailsArray);
		console.log(idArray);
	}
}
// call function
objectToArray();
console.log(emailsArray);

// send all emails

async function sendEmail() {

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD,
		}
	});

	// send mail
	let info = await transporter.sendMail({
		from: "example@gmail.com",
		to: emailsArray.join(", "),
		subject: "Example",
		html: "Example"
	});

	transporter.sendMail(info, (err, data) => {
		if (err) {
			console.log("Errror: ", err);
		} else {
			console.log("Email sent");
		}
	})
}
sendEmail().catch(console.error);

