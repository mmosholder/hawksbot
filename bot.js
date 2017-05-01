var _ = require('lodash');
var Twit = require('twit');
var T = new Twit(require('./config.js'));

var stream = T.stream('user');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: false}));

var _ = require('lodash');
var moment = require('moment');

// Set up daily cron
const lastWin = moment('20170331 22:00:00', 'YYYYMMDD hh:mm:ss');
const unix = moment(lastWin).valueOf();

moment.fn.daysFromNow = function() {
  return Math.floor((+new Date() - (+this))/86400000);
}

const fromNow = moment(unix).daysFromNow() + ' DAYS';

console.log(fromNow);

rule.dayOfWeek = [0, new schedule.Range(0, 6)];
rule.hour = 17;
rule.minute = 18;

// var j = schedule.scheduleJob(rule, function(){
//   console.log('Today is recognized by Rebecca Black!');
//
//   // Post the daily update
//   T.post('statuses/update', { status: ("IT HAS BEEN " + fromNow + " SINCE THE LAST BLACKHAWKS WIN RT FOR AWARENESS") }, function(err, data, response) {
//     console.log(data)
//   });
//
// });


// //Interact with anyone who dare @s the bot
stream.on('tweet', function (message) {
  console.log(fromNow)
  // if (message.in_reply_to_screen_name == 'BlackhawksBot') {
  //   T.post('statuses/update', {in_reply_to_status_id: message.id_str, status: '@' + message.user.screen_name + ' ' + (fromNow + ' BUDDY')}, function(err, data, response){
  //     console.log('snarky reply sent');
  //   });
  // }
})

var port = process.env.PORT || 9945;
var server = app.listen(port, function() {
	console.log('Express server listening on port ' + port);
});
