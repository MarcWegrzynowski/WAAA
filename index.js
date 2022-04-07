const fs = require('fs')
const DiscordJS = { Client, Collection, Intents} = require('discord.js')
const { token } = require('./config.json')
const Discord = require("discord.js")


const client = new DiscordJS.Client({
    intents: [ 
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES,
    ],
})

const prefix = "!"

client.commands = new DiscordJS.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (file of commandFiles) {
	const commandName = file.split(".")[0] //getting the command name
    const command = require(`./commands/${commandName}`)
    client.commands.set(commandName, command)
}


client.on('ready', () => {
    client.user?.setPresence({ activities: [{ name: 'with you probably' }], status: 'online' })
    console.log('The bot is ready')
})

client.on('messageCreate', message => {
    if (message.content.startsWith(prefix)) {
        //commands need ! before them
        const args = message.content.slice(prefix.length).trim().split(/ + /g)
        const commandName = args.shift()
        const command = client.commands.get(commandName)
        if(!command) return
        command.run(client, message, args)
    }
})


client.login(token)