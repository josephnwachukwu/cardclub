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








exports.api = functions.runWith({ memory: '1GB', timeoutSeconds: 120 }).https.onRequest(app);