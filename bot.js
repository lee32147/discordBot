var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
flaga = false;
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
				bot.sendMessage({
					to: channelID,
					message: "Pong!"
				});
			break;
			case 'loop':  
			var i = 1;
			if(flaga == false){
			flaga = true;
			interval = setInterval(function(){
				nazwa = i + ".png"
				bot.uploadFile({
					to: channelID,
					file: nazwa
					});
					i++;
					i = i%6;
			}, 1000);}
			else{
				bot.sendMessage({
					to: channelID,
					message: "Pętla już działa"
				});
			}
			break;
			case 'porn':  
			var i = 1;
			interval2 = setInterval(function(){
				nazwa = "girl" + i + ".gif"
				bot.uploadFile({
					to: channelID,
					file: nazwa
					});
					i++;
					if (i > 3){
						clearInterval(interval2);
					}
			}, 1000);
			break;
			case 'stop':
			if(flaga == true){
				clearInterval(interval);
			}
				bot.sendMessage({
					to: channelID,
					message: "Zatrzymanie pętli"
				});
			break;
            // Just add any case commands if you want to..
         }
     }
});