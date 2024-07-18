// const AWS = require('aws-sdk');

// // Update AWS configuration with your desired region and endpoint
// AWS.config.update({ region: 'us-west-2', endpoint: 'http://localhost:8000' });

// // Create a DynamoDB DocumentClient
// const dynamodb = new AWS.DynamoDB.DocumentClient();

// // Check DynamoDB connection status
// const ddb = new AWS.DynamoDB();
// ddb.listTables({}, function(err, data) {
//   if (err) {
//     console.error("Unable to list tables. Error:", JSON.stringify(err, null, 2));
//   } else {
//     console.log("Connected to DynamoDB. Tables:", data.TableNames);
//     if (data.TableNames.includes('event')) {
//       console.log("event table exists.");
//     } else {
//       console.log("event table does not exist.");
//     }
//   }
// });

// exports.events = function (req, res) {
//   var params = {
//     TableName: 'event',
//   };

//   dynamodb.scan(params, function (err, data) {
//     if (err) {
//       console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
//       res.status(500).json({ error: "Unable to scan the table", message: err.message });
//     } else {
//       res.json(data.Items);
//     }
//   });
// };

// exports.event = function (req, res) {
//   var params = {
//     TableName: 'event',
//     Key: {
//       id: req.params.eventId // Ensure id is a number
//     }
//   };

//   dynamodb.get(params, function (err, data) {
//     if (err) {
//       console.error("Unable to get item. Error JSON:", JSON.stringify(err, null, 2));
//       res.status(500).json({ error: "Unable to get item", message: err.message });
//     } else {
//       if (data.Item) {
//         res.json(data.Item);
//       } else {
//         res.status(404).json({ error: "Event not found" });
//       }
//     }
//   });
// };

// exports.addEvent = function (req, res) {
//   var params = {
//     TableName: 'event',
//     Item: {
//       id: req.body.id.toString(), // Ensure id is a string when adding a new item
//       title: req.body.title,
//       detail: req.body.detail,
//       date: req.body.date
//     }
//   };

//   dynamodb.put(params, function (err, data) {
//     if (err) {
//       console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
//       res.status(500).json({ error: "Unable to add item", message: err.message });
//     } else {
//       res.json({ success: true });
//     }
//   });
// };

// module.exports = function helloworld() {
//     const firstName = "Andrew Jayasinghe";
//     console.log("Hello " + firstName);
//   };

const events = require('./events.js');
const express = require('express');
const app = express();

exports.getEvents = function (req, res) {
  res.json(events);
};

exports.getEventById = function (req, res) {
  const event = events.find(e => e.id == req.params.eventId);
  if (event) {
    res.json(event);
  } else {
    res.status(404).send('Event not found');
  }
};

app.get('/events', exports.getEvents);
app.get('/events/:eventId', exports.getEventById);

module.exports = app;

