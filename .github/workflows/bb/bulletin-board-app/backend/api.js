const AWS = require('aws-sdk');

// Update AWS configuration with your desired region
AWS.config.update({ region: 'us-east-1' });

// Create a DynamoDB service object
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

// Check DynamoDB connection status
dynamodb.listTables({}, function(err, data) {
  if (err) {
    console.error("Unable to list tables. Error:", JSON.stringify(err, null, 2));
  } else {
    console.log("Connected to DynamoDB. Tables:", data.TableNames);
    // Optionally check if EventsTable exists in the list of tables
    if (data.TableNames.includes('EventsTable')) {
      console.log("EventsTable exists.");
    } else {
      console.log("EventsTable does not exist.");
    }
  }
});

exports.events = function (req, res) {
  var params = {
    TableName: 'EventsTable',
  };

  dynamodb.scan(params, function (err, data) {
    if (err) {
      console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
      res.status(500).json({ error: "Unable to scan the table", message: err.message });
    } else {
      res.json(data.Items);
    }
  });
};

exports.event = function (req, res) {
  var params = {
    TableName: 'EventsTable',
    Key: {
      id: req.params.eventId
    }
  };

  dynamodb.getItem(params, function (err, data) {
    if (err) {
      console.error("Unable to get item. Error JSON:", JSON.stringify(err, null, 2));
      res.status(500).json({ error: "Unable to get item", message: err.message });
    } else {
      if (data.Item) {
        res.json(data.Item);
      } else {
        res.status(404).json({ error: "Event not found" });
      }
    }
  });
};

exports.addEvent = function (req, res) {
  var params = {
    TableName: 'EventsTable',
    Item: {
      id: req.body.id,
      title: req.body.title,
      detail: req.body.detail,
      date: req.body.date
    }
  };

  dynamodb.putItem(params, function (err, data) {
    if (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      res.status(500).json({ error: "Unable to add item", message: err.message });
    } else {
      res.json({ success: true });
    }
  });
};
