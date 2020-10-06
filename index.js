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
// TODO: Reconfig message section

async function sendEmail() {

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD,
		}
	});	


	let info;
	// send mail
	for (let i=0; i < namesArray.length; i++) {
		for (let k=0; k < emailsArray.length; k++) {	
			info = await transporter.sendMail({
				from: "example@gmail.com",
				to: emailsArray[k],
				subject: "Example",
				html: `Hi ${namesArray[i]}`
			});
		}
		console.log(`Email: ${idArray[i]} on ${emailsArray.length}`);
	}	

	transporter.sendMail(info, (err, data) => {
		if (err) {
			console.log("Errror: ", err);
		} else {
			console.log("All emails sent");
		}
	})
}
// call function
sendEmail().catch(console.error);
