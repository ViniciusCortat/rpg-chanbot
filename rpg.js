const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
})

client.login(process.env.BOT_TOKEN)

var pauta
var game
var gameon = 0
var thanosCount = 12
var hangy = ["unity","lily","yaharo"]
var word
var hangyman = 0

client.on('message', (mensagem) => {
    if(mensagem.author == client.user) { // Prevent bot from responding to its own messages
        return
    }
	if(mensagem.content.startsWith("!")) {
        let fullCommand = mensagem.content.substr(1).toLowerCase()
		let splitCommand = fullCommand.split(" ") 
		let primaryCommand = splitCommand[0]
		
		switch(primaryCommand) {
			case "help":
				mensagem.channel.send("!driveProj\n!driveAdm\n!trello\n!slack\n!save\n!pauta\n!intro\n!suggestion\n!yaharo\n!game\n!try\n!disclaimer")
				break
			case "driveProj": 
				mensagem.channel.send("https://drive.google.com/drive/folders/0B0sTPCw3EupvVzllaEkyZDdYWWc")
				break
			case "driveAdm": 
				mensagem.channel.send("https://drive.google.com/drive/folders/0BxD_EjlgXY3DMlRCb1VKRXdVZUE")
				break
			case "trello": 
				mensagem.channel.send("https://trello.com/rpgriopucgames/home")
				break
			case "slack": 
				mensagem.channel.send("https://rpgriopucgames.slack.com/messages/C0QKLKN5V/details/")
				break
			case "save": 
				if(splitCommand[1] == undefined) {
					mensagem.channel.send("Qual pauta você gostaria de salvar?")
				}
				else {
					pauta = mensagem.content.substr(11)
					mensagem.channel.send("Pauta Salva")
				}
				break
			case "pauta": 
				if(pauta == undefined) {
					mensagem.channel.send("Não há nenhuma pauta salva.")
				}
				else {
					mensagem.channel.send(pauta)
				}
				break
			case "intro": 
				mensagem.channel.send("Yaharo! Meu nome é Lily e eu sou a Bot da RPG, espero que possamos trabalhar e vivenciar momentos infinitos juntos!")
				break
			case "suggestion": 
				client.users.get("267749503635816462").send(mensagem.content.substr(12) + "\n\nEnviado por " + mensagem.author.username + "\n----------------------------------")
				mensagem.channel.send("Arigato gozaimashita!")
				break
			case "yaharo": 
				mensagem.channel.send("https://myanimelist.net/anime/14813/Yahari_Ore_no_Seishun_Love_Comedy_wa_Machigatteiru")
				break
			//-------------------------------------------------------------------Number Game-------------------------------------------------------------------------------------
			case "game": 
				if(Math.abs(isNaN(parseInt(splitCommand[1],10)))) {
					mensagem.channel.send("Baka! Você esqueceu de informar o número")
				}
				else {
					game = Math.abs(Math.floor((Math.random() * parseInt(splitCommand[1],10)) + 1))
					mensagem.channel.send("Gemu starto!")
					gameon = 1
				}
				break
			case "try": 
				if(gameon) {
					var trygame = Math.abs(parseInt(splitCommand[1],10))

					if(isNaN(trygame)) {
						mensagem.channel.send("Baka! Você esqueceu de informar o número")
						return
					}
					if(trygame == game) {
						mensagem.channel.send("Yata, " + mensagem.author.username + " Acertou!")
						gameon = 0
					}
					else {
						mensagem.channel.send("Chigau!")
						if(trygame < game) {
							mensagem.channel.send("Too low!")
						}
						else {
							mensagem.channel.send("Too high!")
						}
					}
				}
				else {
					mensagem.channel.send("O jogo ainda não começou!")
				}
				break
			//----------------------------------------------------------------------Hangyman Game--------------------------------------------------------------------------------
			case "hangyman":
				hangyman = 1
				let i = Math.floor((Math.random()*hangy.length))
				word = hangy[i].split('')
				for(let i = 0;i < word.length;i++) {
					mensagem.channel.send(word[i])
				}
				break
			case "disclaimer":
				mensagem.channel.send("Eu fui feita pelo Vinny e ainda estou em desenvolvimento, se tiver alguma duvida sobre meu funcionamento e o comando !help nao estiver ajudando, fale com ele pelo !suggestion para me ajudar a ser mais intuitiva e user-friendly!")
				break
			default:
				mensagem.channel.send("Gomenasai, não entendi o que você quer. Tente pedir ajuda pelo comando !help")
		}
    }
	else {
		let fullCommand = mensagem.content.toLowerCase()
		let splitCommand = fullCommand.split(" ") 
		let primaryCommand = splitCommand[0]
		
		
		if(mensagem.content.includes("thanos")) {
			thanosCount++
			mensagem.channel.send("<:thanos:520382259698597899> " + thanosCount)
			mensagem.react('520382259698597899')
		}
		if(mensagem.content.includes("believe")) {
			mensagem.channel.send("https://www.youtube.com/watch?v=50sVthk7Vto")
			
		}
		if(mensagem.content.includes("voce consegue")) {
			mensagem.channel.send("https://www.youtube.com/watch?v=3qRHMhAZNPY")
			
		}
		
		switch(primaryCommand) {
			case "itekimasu": 
				mensagem.channel.send("Iterashai!")
				break
			case "tadaima": 
				mensagem.channel.send("Okaeri!")
				break
			case "sad": 
				mensagem.channel.send("Don't be sad\n https://youtu.be/7zp1TbLFPp8?t=37")
				break
			case "really":
				if(splitCommand[1] == "sad") {
					mensagem.channel.send("Its not too late to be happy\n https://www.youtube.com/watch?v=XAIKmpFpTh8")
				}
				break
			case "extremely":
				if(splitCommand[1] == "sad") {
					mensagem.channel.send("Well, u asked for it\n https://www.youtube.com/watch?v=xhfnTs0RZLs")
				}
				break
			case "tururu":
				mensagem.channel.send("tururu\n https://youtu.be/wEWF2xh5E8s?t=28")
				break
			case "baka": 
				if(splitCommand[1].toUpperCase() == "VINNY") {
					mensagem.channel.send("Vinny-nii-chan daisuki!")
				}
				else {
					mensagem.channel.send(splitCommand[1].toUpperCase() + " NO BAKA!")
				}
				break
			case "yaharo": 
				if(mensagem.author.username == "Vinny") {
					mensagem.channel.send("Yaharo Vinny-nii-chan!")
				}
				else {
					mensagem.channel.send("Yaharo "+ mensagem.author.username + "-senpai!")
				}
				break
		}
	}
})
