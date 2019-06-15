const Discord = require('discord.js')
const ytdl = require('ytdl-core')
const {Client} = require('pg')
const client = new Discord.Client()

const db = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: true,
})

db.connect();

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
})

client.login(process.env.BOT_TOKEN)
const queue = new Map()

var pauta = {}
var game
var gameon = 0
var thanosCount = 47
var hangy = ["unity","thanos","owy","irezumi","tururu","slackbot","quarins","trello","discord"]
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
				mensagem.channel.send("!driveproj\n!driveadm\n!trello\n!slack\n!save\n!pauta\n!game\n!try\n!hangyman\n!letter\n!play\n!skip\n!stop\n!role\nAlém disso, posso rolar: uma cor, um rpg ou um ship")
				break
			case "driveproj": 
				mensagem.channel.send("https://drive.google.com/drive/folders/0B0sTPCw3EupvVzllaEkyZDdYWWc")
				break
			case "driveadm": 
				mensagem.channel.send("https://drive.google.com/drive/folders/0BxD_EjlgXY3DMlRCb1VKRXdVZUE")
				break
			case "trello": 
				mensagem.channel.send("https://trello.com/rpgriopucgames/home")
				break
			case "slack": 
				mensagem.channel.send("https://rpgriopucgames.slack.com/messages/C0QKLKN5V/details/")
				break
			case "role":
				if(splitCommand[1] == undefined) {
					mensagem.channel.send("De qual role você quer saber os membros?")
				}
				else 
				{
					var arg = fullCommand.substr(fullCommand.indexOf(" ") + 1);
					var msg = GetMembersFromRole(arg);
					if(msg === "") mensagem.channel.send("Não foram encontrados membros na role " + arg);
					else mensagem.channel.send(msg);
				}
				break
			case "save": 
				if(splitCommand[1] == undefined) {
					mensagem.channel.send("Qual pauta você gostaria de salvar?")
				}
				else {
					pauta[mensagem.channel.name] = mensagem.content.substr(6)
					mensagem.channel.send("Pauta Salva")
				}
				break
			case "pauta": 
				if(pauta[mensagem.channel.name] == undefined) {
					mensagem.channel.send("Não há nenhuma pauta salva.")
				}
				else {
					mensagem.channel.send(pauta[mensagem.channel.name])
				}
				break
			//-------------------------------------------------------------------Number Game-------------------------------------------------------------------------------------
			case "game": 
				if(Math.abs(isNaN(parseInt(splitCommand[1],10)))) {
					mensagem.channel.send("Inform number!")
				}
				else {
					game = Math.abs(Math.floor((Math.random() * parseInt(splitCommand[1],10)) + 1))
					mensagem.channel.send("Start!")
					gameon = 1
				}
				break
			case "try": 
				if(gameon) {
					var trygame = Math.abs(parseInt(splitCommand[1],10))

					if(isNaN(trygame)) {
						mensagem.channel.send("Inform number!")
						return
					}
					if(trygame == game) {
						mensagem.channel.send(mensagem.author.username + " Acertou!")
						gameon = 0
					}
					else {
						mensagem.channel.send("Wrong!")
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
				mensagem.channel.send("Start!")
				mensagem.channel.send("Lives: " + hangyLives)
				mensagem.channel.send("Palavra: " + wordattempt.join(' ').toString())
				break
			case "letter":
				if(hangyman) {
					if(splitCommand[1] == null) {
						mensagem.channel.send("Inform letter!")
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
						mensagem.channel.send("You Died")
						hangyman = 0
					}
					if(wordattempt.toString() === word.toString().toUpperCase()) {
						mensagem.channel.send(mensagem.author.username + " Acertou!")
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
			default:
				mensagem.channel.send("Invalid command, for further assistance consult !help")
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
		if(mensagem.content.toLowerCase().includes("rola uma cor")){
			var color = GetRandomColor();
			mensagem.channel.send("#" + color + " https://www.colorcombos.com/images/colors/" + color + ".png");
		}
		if(mensagem.content.toLowerCase().includes("rola um rpg")){
			mensagem.channel.send(GetRandomMember(mensagem));
		}
		if(mensagem.content.toLowerCase().includes("rola um ship")){
			
			var numeroEspecificado = -1;

			//verifica se o número de envolvidos foi especificado
			for(i = 0; i < splitCommand.length; i++){
				if(!isNaN(splitCommand[i])){ //checa se é um número
					var numeroEspecificado = parseInt(splitCommand[i]);
					break;
				}
			}

			//senão, aleatoriza
			if(numeroEspecificado === -1){
				numeroEspecificado = GenerateRandomQt(2, 0.5);
			}

			mensagem.channel.send(GetRandomMembers(mensagem, numeroEspecificado));
		}
		
		switch(primaryCommand) {
			case "sad":
				mensagem.content = "something https://www.youtube.com/watch?v=7zp1TbLFPp8"
				mensagem.channel.send("Don't be sad\n https://www.youtube.com/watch?v=7zp1TbLFPp8")
				if(mensagem.member.voiceChannel)
					execute(mensagem,serverQueue)
				break
			case "really":
				if(splitCommand[1] == "sad") {
					mensagem.content = "something https://www.youtube.com/watch?v=XAIKmpFpTh8"
					mensagem.channel.send("Its not too late to be happy\n https://www.youtube.com/watch?v=XAIKmpFpTh8")
					if(mensagem.member.voiceChannel)
						execute(mensagem,serverQueue)
				}
				break
			case "extremely":
				if(splitCommand[1] == "sad") {
					mensagem.content = "something https://www.youtube.com/watch?v=xhfnTs0RZLs"
					mensagem.channel.send("Well, u asked for it\n https://www.youtube.com/watch?v=xhfnTs0RZLs")
					if(mensagem.member.voiceChannel)
						execute(mensagem,serverQueue)
				}
				break
			case "tururu":
				mensagem.content = "something https://www.youtube.com/watch?v=wEWF2xh5E8s"
				mensagem.channel.send("tururu\n  https://www.youtube.com/watch?v=wEWF2xh5E8s")
				if(mensagem.member.voiceChannel)
					execute(mensagem,serverQueue)
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
			mensagem.channel.send("*Drop the Base*")
		} catch(err) {
			console.log(err)
			queue.delete(mensagem.guild.id)
			return mensagem.channel.send("Ocorreu um erro")
		}
	}
	else {
		serverQueue.songs.push(song)
		console.log(serverQueue.songs)
		return mensagem.channel.send("Foi adicionado uma nova música a fila de músicas!")
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
	mensagem.channel.send("*Pick up the Base*")
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

function GetRandomMember(mensagem){
	return mensagem.guild.members.random().displayName;
}

function GetMembersFromRole(role){
	var roleList = mensagem.guild.roles;

	var role = roleList.find(x => x.name === role);
	if(role === undefined) return "";

	var memberList = role.members.array();
	if(memberList.length < 1) return "";

	//Por padrão não botei pra marcar, mas se quiserem alterar isso, basta trocar o memberList[i].id pra <@memberList[i].id>
	var ret = memberList[0].id;
	for(var i = 1; i < memberList.length; i++){
		ret = ret + " " + memberList[i].id;
	}

	return ret;
}

function GetRandomMembers(mensagem, n){
	var memberList = [];
	var ret = "";

	//sorteia membros
	for(i = 0; i < n; i++){
		var curMember = GetRandomMember(mensagem);

		//garante que não haja repetições
		var tries = 0;
		while(memberList.includes(curMember) && tries <= 10){
			curMember = GetRandomMember(mensagem);
			tries++;
		} 

		if(tries < 10) memberList.push(curMember);
	}

	//monta string
	ret = memberList[0];
	for(i = 1; i < memberList.length; i++){
		ret = ret + " ❤ " + memberList[i];
	}

	return ret;
}

function GenerateRandomQt(startnum, chanceToIncrease){
	if(Math.random() <= chanceToIncrease) 
		return GenerateRandomQt(startnum+1, chanceToIncrease);
	else 
		return startnum;
}

function GetRandomColor(){
	var hexDigits = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
	for(var str = ''; str.length < 6; str = str + hexDigits[Math.floor(Math.random() * hexDigits.length)]);
	return str;
}