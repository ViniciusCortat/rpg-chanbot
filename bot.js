var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
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

var pauta = 0;

//COMMANDS WITH !
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
		var cmd2 = args[1];
		var cmd3;
		
       
        args = args.splice(1);
        switch(cmd) {
            case 'doc':
                bot.sendMessage({
                    to: channelID,
                    message: 'https://drive.google.com/drive/folders/0B0sTPCw3EupvVzllaEkyZDdYWWc'
                });
            break;
			case 'intro':
                bot.sendMessage({
                    to: channelID,
                    message: 'Yaharo! Meu nome é RPG-chan e eu sou a Bot da RPG, espero que possamos trabalhar e vivenciar momentos infinitos juntos!\n\n!help'
                });
            break;
			case 'resetpauta':
				pauta = 0;
                bot.sendMessage({
                    to: channelID,
                    message: 'Pauta resetada!'
                });
            break;
			case 'pauta':
                bot.sendMessage({
                    to: channelID,
                    message: pauta.toString()
                });
            break;
			case 'savepauta':
				var i = 1;
				while(args[i] != null) {
					cmd3 = args[i];
					cmd2 = cmd2.concat(" ");
					cmd2 = cmd2.concat(cmd3);
					i++;
				}
				if(pauta == 0) {
					pauta = cmd2;
				}
				else {
					bot.sendMessage({
                    to: channelID,
                    message: 'Ja existe uma pauta salva\nescreva !resetpauta para salvar uma nova'
                });
					break;
				}
				if(user.toString() == "Vinny") {
					bot.sendMessage({
                    to: channelID,
                    message: user.toString()+ '-nii-chan' + ' salvou a pauta: ' + cmd2.toString()
                });
				}
				else {
					bot.sendMessage({
                    to: channelID,
                    message: user.toString()+ '-senpai' + ' salvou a pauta: ' + cmd2.toString()
                });
				}
            break;
			case 's':
				var j = 1;
				while(args[j] != null) {
					cmd3 = args[j];
					cmd2 = cmd2.concat(" ");
					cmd2 = cmd2.concat(cmd3);
					j++;
				}
				bot.sendMessage({
                    to: userID,
                    message: cmd2.toString()
                });
                bot.sendMessage({
                    to: channelID,
                    message: 'Sugestão Enviada!'
                });
            break;
			case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: '!intro\n!doc\n!savepauta (seguido da pauta a ser salva)\n!pauta\n!resetpauta'
                });
            break;
            // Just add any case commands if you want to..
         }
     }
});
//COMMANDS WITHOUT !
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    
    var args = message.substring(0).split(' ');
    var cmd = args[0];
       
    args = args.splice(0);
    switch(cmd) {
        // !ping
        case 'tadaima':
            bot.sendMessage({
                to: channelID,
                message: 'Okaeri!'
            });
		break;
		case 'itekimasu':
            bot.sendMessage({
                to: channelID,
                message: 'Iterashai!'
            });
        break;
		case 'yaharo':
            bot.sendMessage({
                to: channelID,
                message: 'Yaharo!'
            });
        break;
		case 'sad':
            bot.sendMessage({
                to: channelID,
                message: 'https://www.youtube.com/watch?v=7zp1TbLFPp8'
            });
        break;
		case 'baka':
            bot.sendMessage({
                to: channelID,
                message: args[1].toUpperCase() + ' NO BAKA!'
            });
        break;
            // Just add any case commands if you want to..
     }
     
});