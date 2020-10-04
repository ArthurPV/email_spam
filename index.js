// import
const nodemailer = require("nodemailer");
const fs = require("fs");
require('dotenv').config();

// show message
console.log("Welcome to the emails spam script");

// declare variable
let personsData = '';
let simpleObject = '';
let personsArray = '';
let namesArray = [];
let emailsArray = [];

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

const objectToArray = () => {
	for (let i=0; i <= simpleObject.length; i++) {
		personsArray = simpleObject[0][i];
		personsArray = Object.values(personsArray);
		namesArray.unshift(personsArray[1]);
		emailsArray.unshift(personsArray[2]);
		console.log(personsArray);
		console.log(namesArray);
		console.log(emailsArray);
	}
}
// call function
objectToArray();

// send all emails in loop
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
		from: "arthurpontiervalois@gmail.com",
		to: emailsArray.join(", "),
		subject: "Is it works ?",
		text: "It works"
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
