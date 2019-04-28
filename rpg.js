const Discord = require('discord.js')
const client = new Discord.Client()
const auth = require('./auth.json')

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
})

client.login(auth.token)

var pauta
var game
var gameon = 0

client.on('message', (mensagem) => {
    if(mensagem.author == client.user) { // Prevent bot from responding to its own messages
        return
    }
	if(mensagem.content.startsWith("!")) {
        let fullCommand = mensagem.content.substr(1)
		let splitCommand = fullCommand.split(" ") 
		let primaryCommand = splitCommand[0]
		
		if(primaryCommand == "help") {
			mensagem.channel.send("!intro\n!drive\n!trello\n!slack\n!savepauta (seguido da pauta a ser salva)\n!pauta\n!suggestion (seguido da sugestão a ser enviada)\n!yaharo\n!game (numero)\n!try (numero)")
		}
		if(primaryCommand == "drive") {
			mensagem.channel.send("https://drive.google.com/drive/folders/0B0sTPCw3EupvVzllaEkyZDdYWWc")
		}
		if(primaryCommand == "trello") {
			mensagem.channel.send("https://trello.com/rpgriopucgames/home")
		}
		if(primaryCommand == "slack") {
			mensagem.channel.send("https://rpgriopucgames.slack.com/messages/C0QKLKN5V/details/")
		}
		if(primaryCommand == "savepauta") {
			if(splitCommand[1] == undefined) {
				mensagem.channel.send("Qual pauta você gostaria de salvar?")
			}
			else {
				pauta = mensagem.content.substr(11)
				mensagem.channel.send("Pauta Salva")
			}
		}
		if(primaryCommand == "pauta") {
			if(pauta == undefined) {
				mensagem.channel.send("Não há nenhuma pauta salva.")
			}
			else {
				mensagem.channel.send(pauta)
			}
		}
		if(primaryCommand == "intro") {
			mensagem.channel.send("Yaharo! Meu nome é RPG-chan e eu sou a Bot da RPG, espero que possamos trabalhar e vivenciar momentos infinitos juntos!\n\n!help")
		}
		if(primaryCommand == "suggestion") {
			client.users.get("267749503635816462").send(mensagem.content.substr(12) + "\n\nEnviado por " + mensagem.author.username + "\n----------------------------------")
		}
		if(primaryCommand == "yaharo") {
			mensagem.channel.send("https://myanimelist.net/anime/14813/Yahari_Ore_no_Seishun_Love_Comedy_wa_Machigatteiru")
		}
		if(primaryCommand == "game") {
			if(isNaN(parseInt(splitCommand[1],10))) {
				mensagem.channel.send("Baka! Você esqueceu de informar o número")
			}
			else {
				game = Math.floor((Math.random() * parseInt(splitCommand[1],10)) + 1)
				mensagem.channel.send("Gemu starto!")
				gameon = 1
			}
		}
		if(primaryCommand == "try") {
			if(gameon) {
				if(isNaN(parseInt(splitCommand[1],10))) {
					mensagem.channel.send("Baka! Você esqueceu de informar o número")
					return
				}
				if(parseInt(splitCommand[1],10) == game) {
					mensagem.channel.send("Yata, " + mensagem.author.username + " Acertou!")
					gameon = 0
				}
				else {
					mensagem.channel.send("Chigau!")
				}
			}
			else {
				mensagem.channel.send("O jogo ainda não começou!")
			}
			
		}
    }
	else {
		let fullCommand = mensagem.content.substr(0)
		let splitCommand = fullCommand.split(" ") 
		let primaryCommand = splitCommand[0]
		
		if(primaryCommand == "itekimasu") {
			mensagem.channel.send("Iterashai!")
		}
		if(primaryCommand == "tadaima") {
			mensagem.channel.send("Okaeri!")
		}
		if(primaryCommand == "sad") {
			mensagem.channel.send("https://youtu.be/7zp1TbLFPp8?t=37")
		}
		if(primaryCommand == "baka") {
			if(splitCommand[1].toUpperCase() == "VINNY") {
				mensagem.channel.send("Vinny-nii-chan daisuki!")
			}
			else {
				mensagem.channel.send(splitCommand[1].toUpperCase() + " NO BAKA!")
			}
		}
		if(primaryCommand == "yaharo") {
			if(mensagem.author.username == "Vinny") {
				mensagem.channel.send("Yaharo Vinny-nii-chan!")
			}
			else {
				mensagem.channel.send("Yaharo "+ mensagem.author.username + "-senpai!")
			}
		}
	}
})