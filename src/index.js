const radio = require('./utils/radio.js');
const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config()

client.login(process.env.CLIENT_TOKEN);

client.on('message', async message => {
	if (!message.guild) return;
	const sqr = message.content.split(' ')
	if (sqr[0] === '/join') {
		let song = ''
		let textChannel = ''
		radio.radio.forEach(radiod => {
			if (sqr[1].toLowerCase() === radiod.commande) {
				song = radiod.url
				textChannel = radiod.name
			}
		})
		// Only try to join the sender's voice channel if they are in one themselves
		if (message.member.voice.channel) {
			const connection = await message.member.voice.channel.join()
			connection.play(song)
			message.channel.send(`Vous écoutez : radio ${textChannel}. Amusez bien sur radio stars !`, { files: ['https://cdn.discordapp.com/attachments/516248543883689985/691302297245974578/Radio_Stars_v2.png'] })
		} else {
			message.reply('You need to join a voice channel first!')
		}
	}
	if (sqr[0] === '/leave') {
		await message.member.voice.channel.leave()
		message.react('🍎');
	}
});