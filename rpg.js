const Discord = require('discord.js')
const ytdl = require('ytdl-core')
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
})

client.login(process.env.BOT_TOKEN)
const queue = new Map()

var pauta
var game
var gameon = 0
var thanosCount = 40
var hangy = ["unity","lily","yaharo","thanos","owy"]
var word
var wordattempt
var hangyman = 0
var hangyLives

client.on('message', (mensagem) => {
    if(mensagem.author == client.user) { // Prevent bot from responding to its own messages
        return
	}
	const serverQueue = queue.get(mensagem.guild.id)

	if(mensagem.content.startsWith("!")) {
        let fullCommand = mensagem.content.substr(1).toLowerCase()
		let splitCommand = fullCommand.split(" ") 
		let primaryCommand = splitCommand[0]
		
		switch(primaryCommand) {
			case "help":
				mensagem.channel.send("!driveProj\n!driveAdm\n!trello\n!slack\n!save\n!pauta\n!intro\n!suggestion\n!yaharo\n!game\n!try\n!hangyman\n!letter\n!play\n!skip\n!stop\n!disclaimer")
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
				hangyLives = 7
				let i = Math.floor((Math.random()*hangy.length))
				word = hangy[i].split('')
				wordattempt = word
				for(let i = 0; i < wordattempt.length;i++) {
					wordattempt[i] = 'X'
				}
				word = hangy[i].split('')
				mensagem.channel.send("Gemu starto!")
				mensagem.channel.send("Lives: " + hangyLives)
				mensagem.channel.send("Palavra: " + wordattempt.join(' ').toString())
				break
			case "letter":
				if(hangyman) {
					if(splitCommand[1] == null) {
						mensagem.channel.send("Baka! Você esqueceu de informar a letra")
						return
					}
					var CountLetter = 0;
					for(let i = 0;i < word.length;i++) {
						if(splitCommand[1] === word[i]) {
							wordattempt[i] = word[i].toUpperCase()
							CountLetter++
						}
					}
					if(CountLetter == 0) {
						hangyLives--
					}
					CountLetter = 0
					mensagem.channel.send("Lives: " + hangyLives)
					mensagem.channel.send("Palavra: " + wordattempt.join(' ').toString())
					if(hangyLives ==  0) {
						mensagem.channel.send("Acabou as vidas")
						hangyman = 0
					}
					if(wordattempt.toString() === word.toString().toUpperCase()) {
						mensagem.channel.send("Yata, " + mensagem.author.username + " Acertou!")
						hangyman = 0
					}
				}
				else {
					mensagem.channel.send("O jogo ainda não começou!")
				}
				break
			//-------------------------------------------------------------------Music-------------------------------------------------------------------------------------------
			case "play":
				execute(mensagem, serverQueue)
				break
			case "skip":
				skip(mensagem, serverQueue)
				break
			case "stop":
				stop(mensagem, serverQueue)
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

async function execute(mensagem, serverQueue) {
	const args = mensagem.content.split(' ')

	const voiceChannel = mensagem.member.voiceChannel
	if(!voiceChannel)
		return mensagem.channel.send("Você precisa estar em um canal de voz para me ouvir!")
	const permissions = voiceChannel.permissionsFor(mensagem.client.user)
	if(!permissions.has('CONNECT') || !permissions.has('SPEAK'))
		return mensagem.channel.send("Eu preciso de permissão para falar!")
	
	const songInfo = await ytdl.getInfo(args[1])
	const song = {
		title: songInfo.title,
		url: songInfo.video_url,
	}

	if(!serverQueue) {
		const queueConstruct = {
			textChannel: mensagem.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true,
		}

		queue.set(mensagem.guild.id, queueConstruct)

		queueConstruct.songs.push(song)

		try {
			var connection = await voiceChannel.join()
			queueConstruct.connection = connection
			play(mensagem.guild, queueConstruct.songs[0])
			mensagem.channel.send("*Anime music starts*")
		} catch(err) {
			console.log(err)
			queue.delete(mensagem.guild.id)
			return mensagem.channel.send("Ocorreu um erro")
		}
	}
	else {
		serverQueue.songs.push(song)
		console.log(serverQueue.songs)
		return mensagem.channel.send("foi adicionado uma nova música a fila de músicas!")
	}
}

function skip(mensagem, serverQueue) {
	if(!mensagem.member.voiceChannel)
		return mensagem.channel.send("Você precisa estar em um canal de voz para pular a música!")
	if(!serverQueue)
		return mensagem.channel.send("Não tem nenhuma música para pular!")
	serverQueue.connection.dispatcher.end()
}

function stop(mensagem, serverQueue) {
	if(!mensagem.member.voiceChannel)
		return mensagem.channel.send("Você precisa estar em um canal de voz para parar a música!")
	serverQueue.songs = []
	serverQueue.connection.dispatcher.end()
	mensagem.channel.send("*Anime music stops*")
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id)

	if(!song) {
		serverQueue.voiceChannel.leave()
		queue.delete(guild.id)
		return
	}

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', () => {
			console.log("A música acabou!")
			serverQueue.songs.shift()
			play(guild, serverQueue.songs[0])
		})
		.on('error', error => {
			console.error(error)
		})
	dispatcher.setVolumeLogarithmic(serverQueue.volume/ 5)
}
