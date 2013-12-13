var Signer = require('goinstant-auth').Signer;
var prompt = require('prompt');
var clip = require('cliparoo');
var config = require('./config/config');

prompt.start();

var secretKey;
var promptOpts;

if (config[process.argv[2]]) {
  promptOpts = ['domain', 'id', 'displayName'];
  secretKey = config[process.argv[2]];
} else {
  promptOpts = ['secretKey', 'domain', 'id', 'displayName'];
}

prompt.get(promptOpts, function(err, result) {
  var signer = new Signer(secretKey || result.secretKey);
  requestGroup(null, function(resultArray) {
    signer.sign({
      domain: result.domain,
      id: result.id,
      displayName: result.displayName,
      groups: resultArray
    }, function(err, token) {
      clip(token, function(err){
        if (err) throw err;
        console.log('JWT Copied to your Clipboard!');
      });
    });
  });
});

function requestGroup(array, cb) {
  var resultArray = array || [];
  console.log('Add a group? (y/n)')
  var yesNoSchema = {
    properties: {
      answer: {
        pattern: /y|n/,
        message: 'Must answer \'y\' or \'n\'',
        required: true
      }
    }
  };
  prompt.get(yesNoSchema, function(err, result) {
    if (result.answer == 'y') {
      getGroup(function(group) {
        resultArray.push(group);
        return requestGroup(resultArray, cb);
      });
    } else {
      return cb(resultArray);
    }
  });
}

function getGroup(cb) {
  prompt.get(['id', 'displayName'], function(err, result) {
    cb(result);
  });
}
