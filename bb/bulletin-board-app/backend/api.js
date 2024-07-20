var events = require('./events.js');

exports.events = function (req, res) {
  res.json(events);
};

exports.event = function (req, res) {
  res.json(events[req.param.eventId]);
};

const statusCodes = require('http').STATUS_CODES;
const httpConstants = require('http2').constants;

// Include the AWS SDK module
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
// Instantiate a DynamoDB document client with the SDK
let dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
