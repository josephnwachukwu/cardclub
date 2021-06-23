const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin  = require('firebase-admin');
const cors = require('cors')
const express = require('express');
const puppeteer = require('puppeteer');
const pdfkit = require('pdfkit');
const helper = require('firebase-functions-helper');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


admin.initializeApp();

const app = express();

// increase function memory and time limit
const runtimeOpts = {
  timeoutSeconds: 120,
  memory: '1GB'
}


// Automatically allow cross-origin requests
app.use(cors({ origin: true }));


exports.sendOrderConfirmation = functions.firestore.document('orders/{orderID}').onCreate((snap, context) => {

  let order = snap.data();
  
  let smtpConfig = {
    host: 'smtp.netfirms.com',
    port: 587,
    secureConnection: false,
    auth: {
      user: 'support@resume-for.me',
      pass: 'Aventador1'
    },
    tls: {rejectUnauthorized: false}
  };

  //let toEmail = 'josephnwachukwu@gmail.com';

  let transport = nodemailer.createTransport(smtpConfig);

  let mailOptions = {
    from: '"Card Club" <support@resume-for.me>',
    to: 'josephnwachukwu@gmail.com',
    subject: `Here are your Order Details for your new Card`,
    html: `Hey ${order.payer.name.given_name} ${order.payer.name.surname}, <br> 
    Thanks for ordering your new card. It will be automatically programmed to your personal link to your profile and you can begin sharing as soon as you get it. Here are the order details for your recent order. <br> 
    <strong>Order ID:</strong> ${order.id} <br> 
    <strong>Card Type:</strong> ${order.cardType} <br> 
    <strong>Total:</strong> ${order.purchase_units[0].amount.value} ${order.purchase_units[0].amount.currency_code}<br>
    <strong>Address:</strong><br> 
    ${order.purchase_units[0].shipping.address.address_line_1}<br>
    ${order.purchase_units[0].shipping.address.admin_area_1}, ${order.purchase_units[0].shipping.address.admin_area_2}<br>
    ${order.purchase_units[0].shipping.address.postal_code}<br>
    <br>
    You Will recieve an email once your card has been shipped.
    <br> 
    Thank you for your order.`
  };

  
  return transport.sendMail(mailOptions, (err, info) => {
    if(err) {
      console.log(err)
    }
    else {
      console.log(info)
    }
  });
  

})


exports.api = functions.runWith({ memory: '1GB', timeoutSeconds: 120 }).https.onRequest(app);